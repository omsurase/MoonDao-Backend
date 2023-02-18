import express from "express";
import sbtRoutes from "./routes/sbt.routes.js";
import roomRoutes from "./routes/room.routes.js";
import orgRoutes from "./routes/org.routes.js";
import transcriptRoutes from "./routes/transcript.routes.js";
import teamRoutes from "./routes/team.routes.js";
import orgChatRoutes from "./routes/orgChat.routes.js";
import fileRoutes from "./routes/files.routes.js";

const router = express.Router();

router.use("/sbt", sbtRoutes);
router.use("/room", roomRoutes);
router.use("/org", orgRoutes);
router.use("/transcript", transcriptRoutes);
router.use("/team", teamRoutes);
router.use("/orgChat", orgChatRoutes);
router.use("/file", fileRoutes);

export default router;
