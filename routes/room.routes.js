import express from 'express';
import { addParticipant, getParticipants, updatePeerId, removeParticipant } from '../controllers/room.controller.js';

const router = express.Router();

router.post('/addPeer', addParticipant);
router.post('/getPeers', getParticipants);
router.post('/updatePeerId', updatePeerId);
router.post('/removePeer', removeParticipant);

export default router;
