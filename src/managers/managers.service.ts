import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ){}

  create(CreateManagerDto: CreateManagerDto) {
    return this.managerRepository.save(CreateManagerDto);
  }

  findAll() {
    return this.managerRepository.find();
  }

  findOne(id: string) {
    const manager = this.managerRepository.findOneBy({
      managrId: id
    })
    if (!manager) throw new NotFoundException()
    return manager;
  }

  async update(id: string, UpdateManagerDto: UpdateManagerDto) {
    const manager = await this.managerRepository.preload({
      managrId: id,
      ... UpdateManagerDto
    })
    return this.managerRepository.save(manager);
  }

  remove(id: string) {
    this.managerRepository.delete({
      managrId: id
    })
    return `Se elimino el manager con id: ${id}`;
  }
}
