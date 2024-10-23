import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { user: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
