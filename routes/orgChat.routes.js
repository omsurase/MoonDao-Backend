import express from "express";
import { addChat, getChats } from "../controllers/orgChat.controller.js";

const router = express.Router();

router.post("/addChat", addChat);
router.post("/getChats", getChats);

export default router;