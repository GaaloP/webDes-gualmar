import { IsEmail, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateManagerDto extends Manager{
    @ApiProperty()
    @IsString()
    @MaxLength(100)
    managerName: string

    @ApiProperty()
    @IsNumber()
    managerSalary: number

    @ApiProperty()
    @IsString()
    @IsEmail()
    managerEmail: string

    @ApiProperty()
    @IsString()
    managerPhoneNumber: string

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    location: Location;
}
