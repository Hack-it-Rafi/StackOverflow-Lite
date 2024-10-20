import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    try {
      const decoded = jwt.verify(
        token,
        config.JWT_ACCESS_SECRET as string,
      ) as JwtPayload;

      const { email } = decoded;

      const user = await User.findOne({ email: email });
      if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User not found!');
      }

      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized!');
      }

      req.user = user;

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'Token expired. Please log in again.',
        );
      }
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token.');
    }
  });
};

export default auth;
