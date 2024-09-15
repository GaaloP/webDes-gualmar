import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto)
    return employee
  }

  findAll() {
    return this.employeeRepository.find()
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy({
      employeeId: id
    })
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeU =  await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    })
    const savedEmployee = this.employeeRepository.save(employeeU)
    return savedEmployee;
  }

  remove(id: string) {
    this.employeeRepository.delete({
      employeeId: id
    })
    return {
      mesage: `Empleado con el id ${id} eliminado`
    }
  }
}
