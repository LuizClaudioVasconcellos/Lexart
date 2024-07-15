import { Request, Response } from 'express';
import { UpdateUserService } from '../services/UpdateUserService';
import { DeleteUserService } from '../services/DeleteUserService';
import { ShowUserService } from '../services/ShowUserService';
import { ListUsersService } from '../services/ListUserService';

// import AppError from '@shared/errors/AppError';
import AppError from '../../../shared/errors/AppError';

export class UserController {
  async findAll(request: Request, response: Response): Promise<Response> {
    const listUsersService = new ListUsersService();

    const users = await listUsersService.execute();
    return response.json(users);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const showUserService = new ShowUserService();

      const user = await showUserService.execute(Number(id));
      return response.json(user);
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
    const { name, email, password } = request.body;

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({
      id: Number(id),
      name,
      email,
      password,
    });
    return response.json(user);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const deleteUserService = new DeleteUserService();

    const { id } = request.params;
    await deleteUserService.execute(Number(id));
    return response.status(204).send();
  }
}
