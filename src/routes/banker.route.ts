import express from 'express';
import { createBanker } from '../controllers';

const router = express.Router();

router.route('/').post(createBanker);

export default router;
