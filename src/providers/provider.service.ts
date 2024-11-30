import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private providerRepositiry: Repository<Provider> 
  ){}
  create(createProviderDto: CreateProviderDto) {
    return this.providerRepositiry.save(createProviderDto);
  }

  findAll() {
    return this.providerRepositiry.find({
      relations: {
        products: true
      }
    });
  }

  findByName(name: string){
    const provider = this.providerRepositiry.findBy({
      providerName: Like(`%${name}%`)
    })
    if(!provider) throw new NotFoundException()
    return provider
  }

  findOne(id: string) {
    return this.providerRepositiry.findOne({
      where: {
        providerId: id
      },
      relations: {
        products: true
      }
    });
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const product = await this.providerRepositiry.preload({
      providerId: id,
      ...updateProviderDto
    })
    return this.providerRepositiry.save(product);
  }

  remove(id: string) {
    this.providerRepositiry.delete({
      providerId: id
    })
    return `Se elimino el proveedor con  id: ${id}`;
  }
}
