import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { UserData } from 'src/auth/decorators/user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constant';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiAuth()
@ApiTags('PROVIDERS')
@Controller('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Auth(ROLES.MANAGER)
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll(@UserData() user: User) {
    if (user.userRoles.includes("Employee")) throw new UnauthorizedException("no se pode")
    return this.providerService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get('/name/:name')
  findByName(@Param('name') name: string) {
    return this.providerService.findByName(name)
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    const provider = this.providerService.findOne(id);
    if (!provider) throw new NotFoundException()
    return provider
  }

  @Auth(ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providerService.update(id, updateProviderDto);
  }
  
  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providerService.remove(id);
  }
}
