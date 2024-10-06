import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constant';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Manager } from './entities/manager.entity';

@ApiAuth()
@ApiTags('MANAGERS')
@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Auth()
  @ApiResponse({
    status: 201,
    example: {
      managerName: "Joselito Pérez",
      managerSalary: 20000,
      managerEmail: "josel@email.com",
      managerPhoneNumber: "4423840293"
    } as Manager
  })
  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }
  
  @Auth()
  @Get()
  findAll() {
    return this.managersService.findAll();
  }
  
  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managersService.findOne(id);
  }
  
  @Auth(ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }
  
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managersService.remove(id);
  }
}
