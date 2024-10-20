import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ){}

  registerUser(createUserDto: CreateUserDto){
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5)
    return this.userRepository.save(createUserDto)
  }

  async loginUser(loginUserDto: LoginUserDto){
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

  async updateUser(updateUserDto: UpdateUserDto, userEmail: string){
    const user = await this.userRepository.preload({
      userEmail,
      ...updateUserDto
    })
    this.userRepository.save(user)
    return user;
  }
}
