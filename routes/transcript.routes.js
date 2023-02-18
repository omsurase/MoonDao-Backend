import express from 'express';
import { getTranscript } from '../controllers/transcript.controller.js';

const router = express.Router();
router.post('/generate', getTranscript);

export default router;