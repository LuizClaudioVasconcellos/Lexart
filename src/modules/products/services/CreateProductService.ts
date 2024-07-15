// import { Product } from '@modules/products/models/productModel';
import { Product } from '../../../modules/products/models/productModel';
// import AppError from '@shared/errors/AppError';
import AppError from '../../../shared/errors/AppError';

interface ProductCreationAttributes {
  name: string;
  price: number;
  description?: string;
}

export class CreateProductService {
  async execute({
    name,
    price,
    description,
  }: ProductCreationAttributes): Promise<Product> {
    try {
      const product = await Product.create({ name, price, description });
      return product;
    } catch (error) {
      throw new AppError('Error creating product', 500);
    }
  }
}
