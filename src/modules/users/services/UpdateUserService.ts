import { User } from '../../../modules/users/models/userModel';
import AppError from '../../../shared/errors/AppError';
// import { User } from '@modules/users/models/userModel';
// import AppError from '@shared/errors/AppError';

interface UserUpdateAttributes extends Partial<User> {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export class UpdateUserService {
  async execute(data: UserUpdateAttributes): Promise<User> {
    const user = await User.findByPk(data.id);

    if (!user) {
      throw new AppError('Produto não encontrado', 404);
    }

    try {
      await user.update(data);
      return user;
    } catch (error) {
      throw new AppError('Erro ao atualizar usuario');
    }
  }
}
