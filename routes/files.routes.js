import express from "express";
import { encryptFile, showFiles } from "../controllers/files.controller.js";

const router = express.Router();

router.post("/addFile", encryptFile);
router.post("/getFiles", showFiles);

export default router;
