import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { throwError } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto);
    return product
    /*
    if(!createProductDto.productId) createProductDto.productId = uuid() 
    this.products.push(createProductDto);
    return createProductDto;
    */
  }

  findAll() {
    return this.productRepository.find({
      relations: {
        provider: true
      }
    });
  }

  findOne(id: string) {
    const product = this.productRepository.findOne({
      relations: {
        provider: true
      },
      where: {
        productId: id
      }
    })
    if(!product) throw new NotFoundException();
    //const product = this.products.filter((product) => product.productId ==id) [0];
    return product;
  }

  findByProvider(providerId: string){
    const x = this.productRepository.findBy({
      provider: {
        providerId: providerId
      }
    })
    return x;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productU = await this.productRepository.preload({
      productId: id,
      ...updateProductDto
    })
    if (!productU) throw new NotFoundException()
    this.productRepository.save(productU);
    return productU;
    /*
    productU = {
      ...productU,
      ...updateProductDto
    }
    this.products = this.products.map((product)=>{
      if(product.productId == id){
        product = productU;
      }
      return product;
    })
    return productU;
    */
  }

  remove(id: string) {
    this.findOne(id)
    this.productRepository.delete({
      productId: id
    })
    return {
      mesage: `Objeto con id ${id} eliminado correctamente`
    }
    /*
    this.findOne(id);
    this.products = this.products.filter((product)=> product.productId != id)
    return this.products;
    */
  }
}
