import express from 'express';
import { createSbt } from '../controllers/sbt.controller.js';

const router = express.Router();

router.post('/create', createSbt);

export default router;
