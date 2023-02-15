import express from 'express';
import { addOrg, getOrg, addMember } from "../controllers/org.controllers.js";

const router = express.Router();

router.post("/addOrg", addOrg);
router.post("/getOrg", getOrg);
router.post("/addMember", addMember);

export default router;