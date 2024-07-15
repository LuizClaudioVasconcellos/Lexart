import { User } from '../../../modules/users/models/userModel';
import AppError from '../../../shared/errors/AppError';
// import { User } from '@modules/users/models/userModel';
// import AppError from '@shared/errors/AppError';

export class DeleteUserService {
  async execute(id: number): Promise<void> {
    const user = await User.findByPk(id);

    if (!user) {
      throw new AppError('Produto não encontrado', 404);
    }

    try {
      await user.destroy();
    } catch (error) {
      throw new AppError('Erro ao deletar produto');
    }
  }
}
