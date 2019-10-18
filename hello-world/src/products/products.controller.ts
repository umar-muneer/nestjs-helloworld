import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Patch,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';
import { identifier } from '@babel/types';
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('desc') desc: string,
    @Body('price') price: number,
  ): {
    id: string;
  } {
    const product = this.productsService.insertProduct(title, desc, price);
    return {
      id: product.id,
    };
  }
  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAllProducts();
  }
  @Get(':id')
  getAProduct(@Param('id') id: string): Product {
    const product = this.productsService.getAProduct(id);
    if (!product.id) {
      throw new NotFoundException('Could not find product');
    }
    return product;
  }
  @Patch(':id')
  @HttpCode(204)
  updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('desc') description: string,
    @Body('price') price: number,
  ) {
    this.productsService.updateAProduct(id, title, description, price);
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    this.productsService.removeAProduct(id);
    return;
  }
}
