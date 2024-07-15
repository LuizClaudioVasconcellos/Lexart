import { User } from '../../../modules/users/models/userModel';
import AppError from '../../../shared/errors/AppError';
// import { User } from '@modules/users/models/userModel';
// import AppError from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
// import authConfig from '@config/auth';
import authConfig from '../../../config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      authConfig.jwt.secret as Secret,
      {
        expiresIn: authConfig.jwt.expiresIn,
      },
    );

    return { user, token };
  }
}
