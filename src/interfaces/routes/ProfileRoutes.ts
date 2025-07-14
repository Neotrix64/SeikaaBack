import { Router } from "express";
import {
  ProfileController,
  getProfile,
  cambiarEstadoCon
} from "../controllers/ProfileController";

const router = Router();

router.post("/crear/perfil", ProfileController);
router.get("/buscarID/perfil/:id", getProfile);
router.patch("/casar/:estado/:idParams/:userToMarry", cambiarEstadoCon);

export default router;
