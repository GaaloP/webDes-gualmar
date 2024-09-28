import { IsEmail, IsNumber, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";

export class CreateManagerDto extends Manager{
    @IsString()
    @MaxLength(100)
    managerName: string
    @IsNumber()
    managerSalary: number
    @IsString()
    @IsEmail()
    managerEmail: string
    @IsString()
    managerPhoneNumber: string
}
