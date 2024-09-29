import { IsEmail, IsString, MinLength } from "class-validator";
import { Entity } from "typeorm";
import { User } from "../entities/user.entity";

@Entity()
export class CreateUserDto extends User {
    @IsString()
    @IsEmail()
    userEmail: string
    @MinLength(8)
    userPassword: string
}
