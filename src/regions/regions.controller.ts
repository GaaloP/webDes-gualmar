import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constant';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Region } from './entities/region.entity';

@ApiAuth()
@ApiResponse({
  status: 201,
  example: {
    regionName: "Centro",
    regionStates: ['CMX','EMX','QRO']
  } as Region
})
@ApiTags('REGIONS')
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Auth()
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }
  
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.regionsService.findAll();
  }
  
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(+id, updateRegionDto);
  }
  
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }
}
