import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

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
    const product = this.products.filter((product) => product.productId ==id) [0];
    if(!product) throw new NotFoundException();
    return product;
  }

  findByProvider(providerId: string){
    const product = this.products.filter((product) => product.provider == providerId);
    if(product.length==0) throw new NotFoundException();
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let productU = this.findOne(id);
    productU = {
      ...productU,
      ...updateProductDto
    }
    this.products = this.products.map((product)=>{
      if(product.productId == id){
        product=productU;
      }
      return product;
    })
    return productU;
  }

  remove(id: string) {
    this.findOne(id);
    this.products = this.products.filter((product)=> product.productId != id)
    return this.products;
  }
}
