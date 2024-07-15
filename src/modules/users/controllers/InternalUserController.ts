import { Request, Response } from 'express';
import { CreateInternalUserService } from '../services/CreateInternalUserService';
// import authConfig from '@config/auth';
import authConfig from '../../../config/auth';
import jwt, { Secret } from 'jsonwebtoken';

// import AppError from '@shared/errors/AppError';
import AppError from '../../../shared/errors/AppError';

export class InternalUserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createInternalUserService = new CreateInternalUserService();

    try {
      const user = await createInternalUserService.execute({
        name,
        email,
        password,
      });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        authConfig.jwt.secret as Secret,
        {
          expiresIn: authConfig.jwt.expiresIn,
        },
      );

      return response.status(201).json({ user, token });
    } catch (error) {
      throw new AppError('Error creating user', 400);
    }
  }
}
