import { User } from '@modules/users/models/userModel';
import AppError from '@shared/errors/AppError';

export class ShowUserService {
  async execute(id: number): Promise<User> {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
