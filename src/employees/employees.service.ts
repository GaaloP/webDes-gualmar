import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) { }

  create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.save(createEmployeeDto)
    return employee
  }

  findAll() {
    return this.employeeRepository.find({
      relations: {
        location: true,
        user: true
      },
    })
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOne({
      relations: {
        location: true,
        user: true
      },
      where: {
        employeeId: id
      }
    })
    return employee;
  }

  findByLocation(id: number) {
    const employee = this.employeeRepository.findBy({
      location: {
        locationId: id
      }
    })
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeU = await this.employeeRepository.preload({
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
