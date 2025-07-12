import { Profile } from "src/domain/models/Profile";
import { ProfileRepository } from "src/domain/repositories/ProfileRepository";

export class CrearPerfil{
    constructor(private readonly profileRepo: ProfileRepository){}

    async ejecutar(profile: Profile): Promise<Profile> {
    const nuevoPerfil = await this.profileRepo.crear(profile);
    return nuevoPerfil;
  }
}