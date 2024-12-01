import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, BadRequestException, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TOKEN_NAME } from './constants/jwt.constants';
import { Cookies } from './decorators/cookies.decorator';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('register/:id')
	registerManager(
		@Query("role") role: string,
		@Body() createUserDto: CreateUserDto,
		@Param("id") id: string
	) {
		if(role=="manager") {
			return this.authService.registerManager(id, createUserDto)
		} else if (role == "employee"){
			return this.authService.registerEmployee(id, createUserDto)
		}
	}

	@Post('login')
	async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response, @Cookies() cookies: any) {
		const token = await this.authService.loginUser(loginUserDto)
		let expireDate = new Date()
		expireDate.setDate(expireDate.getDate() + 7)
		response.cookie(TOKEN_NAME, token, {
			expires: expireDate,
			httpOnly: false,
			maxAge: 1000 * 60 * 60 * 24 * 7,
			sameSite: 'none',
			secure: true
		})
		return;
	}

	@Patch("/:id")
	updateUser(
		@Param('id') userEmail: string, 
		@Body() updateUserDto: UpdateUserDto
	) {
		return this.authService.updateUser(userEmail, updateUserDto)
	}
}
