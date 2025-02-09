import { Request, Response, NextFunction } from 'express';
// import authConfig from '@config/auth';
import authConfig from '../../../config/auth';
import jwt, { Secret } from 'jsonwebtoken';
// import AppError from '@shared/errors/AppError';
// import { UserRole } from '@modules/users/models/userModel';
import AppError from '../../../shared/errors/AppError';
import { UserRole } from '../../../modules/users/models/userModel';

interface TokenPayload {
  id: number;
  role: UserRole;
  iat: number;
  exp: number;
}

export function ensureExternalUser(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    throw new AppError('Token error', 401);
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    throw new AppError('Token malformated', 401);
  }

  try {
    const decoded = jwt.verify(
      token,
      authConfig.jwt.secret as Secret,
    ) as TokenPayload;

    const { role } = decoded;

    if (role !== UserRole.EXTERNAL) {
      throw new AppError('Access denied: only external users are allowed', 403);
    }

    request.user = decoded;
    next();
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    throw new AppError('Invalid JWT token', 401);
  }
}
