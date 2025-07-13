import { Request, Response } from "express";
import { CrearPerfil } from "../../application/CrearPefil";
import { MongoProfileRepository } from "../../infraestructure/repositories/MongoProfileRepository"
import { Profile } from "../../domain/models/Profile"

const mongoRepo = new MongoProfileRepository;
const CrearPerfilCasoUso = new CrearPerfil(mongoRepo);

export const ProfileController = async (req: Request, res: Response) =>{
    try{
        const body: Profile = req.body;

        if(!body.userDiscordId){
            return res.status(404).json({ mensaje: "No proporcionaste un ID"})
        }

        const existe = await mongoRepo.obtenerPorUserDiscordId(body.userDiscordId);
        if (existe) {
        return res.status(409).json({ mensaje: "El perfil ya existe" });
        }


        const nuevoPerfil = await CrearPerfilCasoUso.ejecutar(body);

        return res.status(201).json(nuevoPerfil)
    } catch (error){
        console.error("Error al crear perfil:", error);
        return res.status(500).json({ mensaje: "Error del servidor" });
    }
}