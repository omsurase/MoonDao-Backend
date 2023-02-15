import express from 'express';
import {addTeam, addEmployeeToTeam} from '../controllers/team.controller.js';

const router = express.Router();

router.post('/addTeam', addTeam);
router.post('/addEmployeeToTeam', addEmployeeToTeam);

export default router;
