import { User, UserRole } from '../../../modules/users/models/userModel';
import AppError from '../../../shared/errors/AppError';
// import { User, UserRole } from '@modules/users/models/userModel';
// import AppError from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';

interface UserCreationAttributes {
  name: string;
  email: string;
  password: string;
}

export class CreateExternalUserService {
  async execute({
    name,
    email,
    password,
  }: UserCreationAttributes): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 8);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: UserRole.EXTERNAL,
      });

      return user;
    } catch (error) {
      throw new AppError('Error creating user', 400);
    }
  }
}
