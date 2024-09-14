import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from 'uuid';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[] = [
    {
      id: uuid(),
      name: "Pedro",
      lastName: "Hernandez",
      phoneNumber: "324234232"
    },
    {
      id: uuid(),
      name: "Pablo",
      lastName: "Hernandez",
      phoneNumber: "18284674"
    }
  ]

  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    //retornar todos los empleados
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.filter((employee) => employee.id == id) [0];
    if (!employee) throw new NotFoundException();
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeU = this.findOne(id)
    employeeU = {
      ...employeeU,
      ...updateEmployeeDto
    }
    //if (!employeeU) throw new NotFoundException();
    this.employees = this.employees.map((employee) =>{
      if (employee.id == id){
        employee = employeeU
      }
      return employee
    })
    return employeeU;
  }

  remove(id: string) {
    this.findOne(id); 
    this.employees = this.employees.filter((employee) => employee.id != id);
    return this.employees;
  }
}
