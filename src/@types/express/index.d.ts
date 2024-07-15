// import { UserRole } from '@modules/users/models/User';
import { UserRole } from '../../../modules/users/models/User';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: number;
      role: UserRole;
    };
  }
}
