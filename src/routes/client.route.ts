import express from 'express';
import {
  createClient,
  createClientTransaction,
  connectBankerToClient,
} from '../controllers';

const router = express.Router();

router.route('/').post(createClient);
router.route('/:clientID/transaction').post(createClientTransaction);
router.route('/:clientID/banker/:bankerID').put(connectBankerToClient);

export default router;
