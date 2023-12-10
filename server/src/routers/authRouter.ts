import { Router } from 'express';
import { login, register } from '@controllers';
import { check } from 'express-validator';

const authRouter = Router();

authRouter.post(
  '/registration',
  [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must contain from 4 to 10 characters').isLength(
      {
        min: 4,
        max: 10,
      }
    ),
  ],
  register
);
authRouter.post('/login', login);

export default authRouter;
