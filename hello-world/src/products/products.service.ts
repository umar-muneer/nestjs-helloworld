import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const newProduct: Product = new Product(
      Math.random().toString(),
      title,
      desc,
      price,
    );
    this.products.push(newProduct);
    return newProduct;
  }

  getAllProducts(): Product[] {
    return [...this.products];
  }

  getAProduct(id: string): Product {
    const [product] =  this.findAProduct(id);
    return product;
  }

  updateAProduct(id: string, title: string, desc: string, price: number) {
    const [product, index] = this.findAProduct(id);
    if (title) {
        product.title = title;
    }
    if (desc) {
        product.description = desc;
    }
    if (price) {
        product.price = price;
    }
    this.products[index] = product;
    return product;
  }

  removeAProduct(id: string) {
    const [_, index] = this.findAProduct(id);
    this.products.splice(index, 1);
  }

  private findAProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    if (productIndex === -1) {
      throw new NotFoundException('Could not find a product');
    }
    const product = this.products[productIndex];
    return [{...product}, productIndex];
  }
}
