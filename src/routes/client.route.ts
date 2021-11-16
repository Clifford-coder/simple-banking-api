import express from 'express';
import { createClient, createClientTransaction } from '../controllers';

const router = express.Router();

router.route('/').post(createClient);
router.route('/:clientID/transaction').post(createClientTransaction);

export default router;
