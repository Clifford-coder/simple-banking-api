import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: { message: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.message === 'Bad Request')
    return res.status(400).json({ message: 'Bad Request' });
  if (err.message === 'Not found')
    return res
      .status(404)
      .json({ message: 'The entity was not found in the database' });
  return res.status(500).send('Something went wrong!');
};

export default errorHandler;
