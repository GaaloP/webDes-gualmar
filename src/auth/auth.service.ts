import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { Manager } from 'src/managers/entities/manager.entity';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(Employee) private employeeRepository: Repository<Employee>,
		@InjectRepository(Manager) private managerRepository: Repository<Manager>,
		private jwtService: JwtService
	) { }

	async registerEmployee(id: string, createUserDto: CreateUserDto) {
		const roles = createUserDto.userRoles
		if (roles.includes("Admin") || roles.includes("Manager")){
			throw new BadRequestException("Rol inválido")
		}
		createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5)
		const user = await this.userRepository.save(createUserDto)
		const employeeUpdate = await this.employeeRepository.preload({
			employeeId: id
		})
		employeeUpdate.user = user
		return this.employeeRepository.save(employeeUpdate)
	}

	async registerManager(id: string, createUserDto: CreateUserDto) {
		const roles = createUserDto.userRoles
		if (roles.includes("Admin") || roles.includes("Employee")){
			throw new BadRequestException("Rol inválido")
		}
		createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5)
		const user = await this.userRepository.save(createUserDto)
		const managerUpdate = await this.managerRepository.preload({
			managrId: id
		})
		managerUpdate.user = user
		return this.managerRepository.save(managerUpdate)
	}

	async loginUser(loginUserDto: LoginUserDto) {
		const user = await this.userRepository.findOneBy({
			userEmail: loginUserDto.userEmail
		})
		if (!user) throw new UnauthorizedException("No autorizado")
		const match = await bcrypt.compare(
			loginUserDto.userPassword,
			user.userPassword
		);
		if (!match) throw new UnauthorizedException()
		const payload = {
			userEmail: user.userEmail,
			userPassword: user.userPassword,
			userRoles: user.userRoles
		}
		const token = this.jwtService.sign(payload)
		return token;
	}

	async updateUser(id: string, updateUserDto: UpdateUserDto) {
		updateUserDto.userPassword = bcrypt.hashSync(updateUserDto.userPassword, 5) 
		const user = await this.userRepository.preload({
			userId: id,
			...updateUserDto
		})
		this.userRepository.save(user)
		return user;
	}
}
