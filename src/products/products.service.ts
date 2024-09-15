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

  private products: CreateProductDto[] =[
    {
      productId: uuid(),
      productName: 'Sabritas Clasicar 40g',
      price: 10,
      countSeal: 3,
      provider: uuid()
    },
    {
      productId: uuid(),
      productName: 'Coca Cola 600ml',
      price: 20,
      countSeal: 5,
      provider: uuid()
    },
    {
      productId: uuid(),
      productName: 'Agua Ciel 1L',
      price: 18,
      countSeal: 0,
      provider: uuid()
    }
  ]
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
    return this.products;
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({
      productId: id
    })
    if(!product) throw new NotFoundException();
    //const product = this.products.filter((product) => product.productId ==id) [0];
    return product;
  }

  findByProvider(providerId: string){
    const product = this.products.filter((product) => product.provider == providerId);
    if(product.length==0) throw new NotFoundException();
    return product;
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
