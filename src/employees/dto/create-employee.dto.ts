import { IsOptional, IsString, IsUUID } from "class-validator"

export class CreateEmployeeDto {
    @IsString()
    @IsUUID("4")
    @IsOptional()
    id: string
    @IsString()
    name: string
    @IsString()
    lastName: string
    @IsString()
    phoneNumber: string
}
