import { Request, Response } from 'express';
import { TransactionType } from '../entities/transaction.entity';
import { Client, Transaction } from '../entities';

const createClient = async (req: Request<{}, {}, Client>, res: Response) => {
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

const createClientTransaction = async (
  req: Request<{ clientID: string }, {}, Transaction>,
  res: Response
) => {
  const { clientID } = req.params;
  const { amount, type } = req.body;

  const client = await Client.findOne(parseInt(clientID));

  if (!client) throw Error('Not found');

  const transaction = await Transaction.create({ amount, type, client }).save();

  if (type === TransactionType.DEPOSIT)
    client.balance = client.balance + amount;
  else if (type === TransactionType.WITHDRAWAL)
    client.balance = client.balance - amount;

  await client.save();

  return res.status(201).json({ transaction });
};

export { createClient, createClientTransaction };
