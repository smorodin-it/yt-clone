import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { createUser } from './user.service';

export const registerUserHandler = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const user = await createUser({ username, email, password });

    return res.status(StatusCodes.CREATED).send({ id: user.id });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send('User already exist');
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};
