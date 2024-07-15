import { Product } from '@modules/products/models/productModel';
import AppError from '@shared/errors/AppError';

interface ProductUpdateAttributes extends Partial<Product> {
  id: number;
  name: string;
  price: number;
  description?: string;
}

export class UpdateProductService {
  async execute(data: ProductUpdateAttributes): Promise<Product> {
    const product = await Product.findByPk(data.id);

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    try {
      await product.update(data);
      return product;
    } catch (error) {
      throw new AppError('Erro ao atualizar produto');
    }
  }
}
