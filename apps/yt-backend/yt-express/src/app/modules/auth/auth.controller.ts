import { Request, Response } from 'express';
import { findUserByEmail } from '../user/user.service';
import { StatusCodes } from 'http-status-codes';

export const loginHandler = async (
  req: Request<unknown, unknown>,
  res: Response
) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);

  if (!user || !user.comparePassword(password)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send('Invalid email or password');
  }

  const payload = user.toJson();
};
