import { Product } from '@modules/products/models/productModel';
import AppError from '@shared/errors/AppError';
import { ProductDeletionLogService } from '@modules/products/services/ProductDeletionLogService';
import redis from '@config/redisClient';

export class DeleteAllProductsService {
  async execute(): Promise<void> {
    try {
      const deletedProducts = await Product.findAll();
      const totalProducts = deletedProducts.length;

      for (let i = 0; i < totalProducts; i++) {
        const product = deletedProducts[i];
        await ProductDeletionLogService.createLog(product.id);

        const progress = Math.round(((i + 1) / totalProducts) * 100);
        await redis.set('deletionProgress', progress);

        const message = JSON.stringify({ progress });
      }

      await Product.destroy({ where: {} });

      await redis.del('deletionProgress');
    } catch (error) {
      throw new AppError('Erro ao deletar todos os produtos');
    }
  }
}
