import { Router } from "express";
import { ProfileController } from "../controllers/ProfileController";

const router = Router();

router.post("/crear/perfil", ProfileController);

export default router;
