import express from 'express';
import {
  createClient,
  createClientTransaction,
  connectBankerToClient,
  deleteClient,
  fetchClient,
} from '../controllers';

const router = express.Router();

router.route('/').post(createClient).get(fetchClient);
router.route('/:clientID/transaction').post(createClientTransaction);
router.route('/:clientID/banker/:bankerID').put(connectBankerToClient);
router.route('/:clientID').delete(deleteClient);

export default router;
