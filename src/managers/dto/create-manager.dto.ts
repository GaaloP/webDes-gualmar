import { IsEmail, IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "src/locations/entities/location.entity";

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
    @IsObject()
    @IsOptional()
    location: Location;
}
