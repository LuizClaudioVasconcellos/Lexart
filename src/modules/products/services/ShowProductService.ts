// import { Product } from '@modules/products/models/productModel';
import { Product } from '../../../modules/products/models/productModel';
// import AppError from '@shared/errors/AppError';
import AppError from '../../../shared/errors/AppError';

export class ShowProductService {
  async execute(id: number): Promise<Product> {
    try {
      const product = await Product.findByPk(id);

      if (!product) {
        throw new AppError('Product not found', 404);
      }

      return product;
    } catch (error) {
      throw error;
    }
  }
}
