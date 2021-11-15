import express from 'express';
import { createClient } from '../controllers';

const router = express.Router();

router.route('/').post(createClient);

export default router;
