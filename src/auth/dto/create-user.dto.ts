import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { Entity } from "typeorm";
import { User } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class CreateUserDto extends User {
    @ApiProperty({
        default: "user@email.com"
    })
    @IsString()
    @IsEmail()
    userEmail: string

    @ApiProperty({
        default: "a2kAj3$KLs4*"
    })
    @IsString()
    @MinLength(8)
    userPassword: string

    @ApiProperty({
        default: "Employee"
    })
    @IsOptional()
    @IsIn(["Admin", "Employee", "Manager"])
    userRoles: string[]
}
