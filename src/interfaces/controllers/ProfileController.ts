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


        const existe = await mongoRepo.obtenerPorUserDiscordId(parseInt(body.userDiscordId.toString()));
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

export const getProfile = async (req: Request, res: Response) =>{
    try{
        const idParam  = req.params.id

        console.log(idParam)

        if(!idParam){
            return res.status(404).json({ mensaje: "No proporcionaste un ID"})
        }

        const consulta = await CrearPerfilCasoUso.obtenerID(idParam);

        if(consulta === null){
            return res.status(404).json({message: "Usuario inexistente"})
        }

        return res.status(201).json(consulta)
    } catch (error){
        console.error("Error al crear obtener perfil:", error);
        return res.status(500).json({ mensaje: "Error del servidor" });
    }
}

export const cambiarEstadoCon = async (req: Request, res: Response) => {
    try{
        const estado = req.params.estado;

        if(!estado){
            return res.status(404).json({ mensaje: "No proporcionaste un casamiento"})
        }

        const idParams = req.params.idParams;
        if(!idParams){
            return res.status(404).json({ mensaje: "No proporcionaste tu ID"})
        }
        
        const userToMarry = req.params.userToMarry;
        if(!userToMarry){
            return res.status(404).json({ mensaje: "No proporcionaste el ID del usuario objetivo"})
        }

        // Agregar logging para ver los parámetros recibidos
        console.log("Parámetros recibidos:", { estado, idParams, userToMarry });

        const resultado = await CrearPerfilCasoUso.cambiarEstado(
            idParams,
            estado,
            userToMarry
        );

        if(!resultado){
            return res.status(404).json({ mensaje: "No se pudo procesar la operación" });
        }

        return res.status(201).json({resultado});
    
    } catch(err){
        console.error("Error al cambiar estado:", err);
        return res.status(500).json({ mensaje: "Error del servidor" });
    }
}