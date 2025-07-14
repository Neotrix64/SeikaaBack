import { Profile } from "src/domain/models/Profile";
import { ProfileRepository } from "src/domain/repositories/ProfileRepository";

export class CrearPerfil{
    constructor(private readonly profileRepo: ProfileRepository){}

    async ejecutar(profile: Profile): Promise<Profile> {
    const nuevoPerfil = await this.profileRepo.crear(profile);
    return nuevoPerfil;
  }

  async obtenerID(id: number): Promise<Profile | null>{
    const result = await this.profileRepo.obtenerPorId(id)
    return result;
  }

  async cambiarEstado(id: number, estado: String, idTarget: number): Promise<Profile | null>{
    const result = await this.profileRepo.cambiarEstado(id, estado, idTarget);
    return result;
  }
}