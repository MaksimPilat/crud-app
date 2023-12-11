import { Request, Response } from 'express';
import { getUser, addUser } from '@services';
import type { IUser } from '@types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { secret } from '../config';

const generateAccessToken = (id: number): string => {
  const payload = { id };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: 'Errors during registration', errors });
  }

  const { username, password }: Omit<IUser, 'id'> = req.body;

  try {
    const candidate: IUser | null = await getUser(username);
    if (candidate) {
      return res
        .status(400)
        .json({ message: 'User with the same username already exists' });
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const newUser = await addUser({
      username,
      password: hashPassword,
    });
    return res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password }: Omit<IUser, 'id'> = req.body;

    const user: IUser | null = await getUser(username);
    if (!user) {
      return res
        .status(400)
        .json({ message: `User ${username} was not found` });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: `Invalid password` });
    }

    const accessToken: string = generateAccessToken(user.id);
    return res.status(200).json(accessToken);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};
