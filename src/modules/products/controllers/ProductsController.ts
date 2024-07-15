import { Request, Response } from 'express';
import { CreateProductService } from '../services/CreateProductService';
import { UpdateProductService } from '../services/UpdateProductService';
import { DeleteProductService } from '../services/DeleteProductService';
import { ShowProductService } from '../services/ShowProductService';
import { ListProductsService } from '../services/ListProductService';
import { DeleteAllProductsService } from '../services/DeleteAllProductsService';
// import AppError from '@shared/errors/AppError';
import AppError from '../../../shared/errors/AppError';
import { ListProductLogsService } from '../services/ListProductLogsService';
// import { sendMessageToWebSocketClients } from '@config/webSocket';
import { sendMessageToWebSocketClients } from '../../../config/webSocket';
import { SeedService } from '../services/SeedService';

export class ProductsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, price, description } = request.body;

    const createProductService = new CreateProductService();

    try {
      const product = await createProductService.execute({
        name,
        price,
        description,
      });
      return response.status(201).json(product);
    } catch (error) {
      return response.status(400).json({ error: 'Erro ao criar produto' });
    }
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    const listProductsService = new ListProductsService();

    const products = await listProductsService.execute();
    return response.json(products);
  }

  async viewLogs(request: Request, response: Response): Promise<Response> {
    const listProductLogsService = new ListProductLogsService();

    const products = await listProductLogsService.execute();
    return response.json(products);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const showProductService = new ShowProductService();

      const product = await showProductService.execute(Number(id));
      return response.json(product);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        });
      }

      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, description } = request.body;

    const updateProductService = new UpdateProductService();

    const product = await updateProductService.execute({
      id: Number(id),
      name,
      price,
      description,
    });
    return response.json(product);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const deleteProductService = new DeleteProductService();

    const { id } = request.params;
    await deleteProductService.execute(Number(id));
    return response.status(204).send();
  }

  async deleteAll(request: Request, response: Response): Promise<Response> {
    const deleteAllProductsService = new DeleteAllProductsService();

    try {
      await deleteAllProductsService.execute();
      // Envia uma mensagem final para o WebSocket indicando que o processo foi concluído
      sendMessageToWebSocketClients(
        JSON.stringify({ progress: 100, message: 'Deletion completed' }),
      );
      return response.status(204).send();
    } catch (error) {
      console.error('Error deleting all products:', error);
      return response
        .status(500)
        .json({ error: 'Erro ao deletar todos os produtos' });
    }
  }

  public async runSeeds(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const seedService = new SeedService();

    try {
      await seedService.execute();
      return response
        .status(200)
        .json({ message: 'Database seeded successfully' });
    } catch (error) {
      return response.status(500).json({ error: 'Error seeding database' });
    }
  }

  public async undoSeeds(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const seedService = new SeedService();

    try {
      await seedService.undo();
      return response
        .status(200)
        .json({ message: 'Database seed undone successfully' });
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'Error undoing seed database' });
    }
  }
}
