import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body()createUserDto: CreateUserDto){
    return this.authService.registerUser(createUserDto)
  }

  @Post('login')
  login(@Body()loginUserDto: LoginUserDto){
    console.log(loginUserDto)
    return this.authService.loginUser(loginUserDto)
  }

  @Put("/:email")
  updateUser(@Param('email') userEmail: string, @Body() updateUserDto: UpdateUserDto){
    return this.authService.updateUser(updateUserDto, userEmail)
  }
}
