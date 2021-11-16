import { NextFunction, Request, Response } from 'express';
import { Client } from '../entities';

const createClient = async (
  req: Request<{}, {}, Client>,
  res: Response,
  next: NextFunction
) => {
  try {
    const client = Client.create({
      ...req.body,
    });
    await client.save();
    console.log('Success in adding client!!');
    res.status(201).send({ client });
  } catch (error) {
    throw Error('Bad Request');
  }
};

export { createClient };
