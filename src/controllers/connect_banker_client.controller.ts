import { Request, Response } from 'express';
import { Banker, Client } from '../entities';

const connectBankerToClient = async (
  req: Request<{ clientID: string; bankerID: string }>,
  res: Response
) => {
  const { clientID, bankerID } = req.params;

  const client = await Client.findOne(parseInt(clientID));
  const banker = await Banker.findOne(parseInt(bankerID));

  if (!client || !banker) throw Error('Not found');

  banker.clients = [client];

  await banker.save();

  res.status(200).send({ message: 'Successfully connected banker and client' });
};

export default connectBankerToClient;
