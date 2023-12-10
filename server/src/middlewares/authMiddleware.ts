import type { Request, Response } from 'express';
import { secret } from 'config';
import jwt from 'jsonwebtoken';

interface IAuthRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export const authMiddleware = (
  req: IAuthRequest,
  res: Response,
  next: Function
) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'User is not authorized' });
    }
    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'User is not authorized' });
  }
};
