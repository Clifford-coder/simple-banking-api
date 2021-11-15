import { Request, Response } from 'express';
import { Client } from '../entities';

const createClient = async (req: Request<{}, {}, Client>, res: Response) => {
  try {
    // const { first_name, last_name, email, card_number, balance } = req.body;

    const client = Client.create({
      ...req.body,
    });
    await client.save();
    console.log('Success in adding client!!');
    res.status(201).send({ client });
  } catch (error) {
    console.log('Error occured in ', error);
    res.status(400).send('Bad Request');
  }
};

export { createClient };
