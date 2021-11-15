import { Request, Response } from 'express';
import { Banker } from '../entities';

const createBanker = async (req: Request<{}, {}, Banker>, res: Response) => {
  try {
    const banker = await Banker.create({ ...req.body }).save();
    res.status(201).send({ banker });
  } catch (error) {
    console.log('Error occured in ', error);
    res.status(400).send('Bad Request');
  }
};

export { createBanker };
