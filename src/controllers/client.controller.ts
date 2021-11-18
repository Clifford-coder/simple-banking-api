import { Request, Response } from 'express';
import { TransactionType } from '../entities/transaction.entity';
import { Client, Transaction } from '../entities';
import { createQueryBuilder } from 'typeorm';

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

const deleteClient = async (
  req: Request<{ clientID: string }>,
  res: Response
) => {
  const { clientID } = req.params;
  await Client.delete(parseInt(clientID));
  return res.status(200).send({ message: 'Succefully deleted client' });
};

const fetchClient = async (req: Request, res: Response) => {
  const client = await createQueryBuilder<Client>('client')
    .select('client')
    .from(Client, 'client')
    .leftJoinAndSelect('client.transactions', 'transactions')
    .where('client.balance > :minBalance', { minBalance: 0 })
    .getMany();

  res.status(200).json({ client });
};

export { createClient, createClientTransaction, deleteClient, fetchClient };
