import { ArrayNotEmpty, IsArray, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "../entities/location.entity";
import { Region } from "src/regions/entities/region.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateLocationDto extends Location{
    @ApiProperty()
    @IsString()
    @MaxLength(35)
    locationName: string
    
    @ApiProperty()
    @IsString()
    @MaxLength(160)
    locationAddres: string
    
    @ApiProperty()
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[]

    @ApiPropertyOptional()
    @IsObject()
    @IsOptional()
    region: Region;
}
