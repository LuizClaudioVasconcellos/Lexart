// import { ProductDeletionLog } from '@modules/products/models/productDeletionLogModel';
import { ProductDeletionLog } from '../../../modules/products/models/productDeletionLogModel';

export class ListProductLogsService {
  async execute(): Promise<ProductDeletionLog[]> {
    const products = await ProductDeletionLog.findAll();
    return products;
  }
}
