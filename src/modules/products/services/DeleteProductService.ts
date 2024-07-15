import { Product } from '@modules/products/models/productModel';
import AppError from '@shared/errors/AppError';

export class DeleteProductService {
  async execute(id: number): Promise<void> {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    try {
      await product.destroy();
    } catch (error) {
      throw new AppError('Erro ao deletar produto');
    }
  }
}
