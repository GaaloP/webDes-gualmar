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
    return this.managerRepository.find({
      relations: {
        location: true
      }
    });
  }

  findOneById(id: string) {
    const manager = this.managerRepository.findOne({
      where: {managrId: id},
      relations: {
        location: true,
        user: true
      }
    })
    if (!manager) throw new NotFoundException()
    return manager;
  }

  async update(id: string, UpdateManagerDto: UpdateManagerDto
  ) {
    const manager = await this.managerRepository.preload({
      managrId: id,
      ... UpdateManagerDto
    })
    return this.managerRepository.save(manager);
  }

  remove(id: string) {
    return this.managerRepository.delete({
      managrId: id
    })
  }
}
