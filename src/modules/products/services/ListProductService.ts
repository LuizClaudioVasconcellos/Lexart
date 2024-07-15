// import { Product } from '@modules/products/models/productModel';
import { Product } from '../../../modules/products/models/productModel';

export class ListProductsService {
  async execute(): Promise<Product[]> {
    const products = await Product.findAll();
    console.log(products);
    return products;
  }
}
