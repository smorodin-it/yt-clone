import { Request, Response } from 'express';

export const loginHandler = async (
  req: Request<unknown, unknown>,
  res: Response
): void => {
  const { email, password } = req.body;
};
