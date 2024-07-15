import { ProductDeletionLog } from '@modules/products/models/productDeletionLogModel';
import { Product } from '@modules/products/models/productModel';

class ProductDeletionLogService {
  static async createLog(productId: number): Promise<void> {
    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        throw new Error(`Produto com ID ${productId} não encontrado`);
      }

      await ProductDeletionLog.create({
        productId: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        deletedAt: new Date(),
      });
    } catch (error) {
      console.error('Erro ao criar log de deletação:', error);
      throw error;
    }
  }
}

export { ProductDeletionLogService };
