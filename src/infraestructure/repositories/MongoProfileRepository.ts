import { ProfileModel, ProfileDocument } from "../models/ProfileModel";
import { ProfileRepository } from "src/domain/repositories/ProfileRepository";
import { Profile } from "src/domain/models/Profile";

export class MongoProfileRepository implements ProfileRepository {
  async crear(profile: Profile): Promise<Profile> {
    const created = new ProfileModel(profile);
    const saved = await created.save();

    const plain: Profile = {
      userDiscordId: saved.userDiscordId,
      Estado: saved.Estado,
      exp: saved.exp,
      nivel: saved.nivel,
      economia: saved.economia,
    };

    return plain;
  }

  async obtenerTodos(): Promise<Profile[]> {
    const profiles = await ProfileModel.find();
    return profiles.map((p) => p.toObject());
  }

  async obtenerPorId(id: number): Promise<Profile | null> {
    const profile = await ProfileModel.findOne({ userDiscordId: id });
    return profile ? profile.toObject() : null;
  }


async cambiarEstado(id: number, estado: String, idTarget: number): Promise<Profile | null> {
    const profile = await ProfileModel.findOne({ userDiscordId: id });
    const targetProfile = await ProfileModel.findOne({ userDiscordId: idTarget });

    if(!profile){
      return null;
    }

    if(!targetProfile){
      return null;
    }

    //Si es divorcio
    if(estado == "unmarry" && profile.Estado[0].CasadoID == idTarget && targetProfile.Estado[0].CasadoID == id ){
        profile.Estado = [];
        targetProfile.Estado = [];
    }

    if(estado == "marry" && profile.Estado.length == 0 && targetProfile.Estado.length == 0 ){
       profile.Estado = [
         {
           CasadoID: idTarget,
           createdDate: new Date(),
         },
       ];

       targetProfile.Estado = [
         {
           CasadoID: id,
           createdDate: new Date(),
         },
       ];
    }
      //Estados por probar

    // if (estado === "marry" && (profile.Estado.length > 0 || targetProfile.Estado.length > 0)) {
    //   throw new Error("Uno de los dos usuarios ya esta casado");
    // }

    if (estado === "unmarry" && (!profile.Estado.length || !targetProfile.Estado.length || profile.Estado[0].CasadoID !== idTarget ||targetProfile.Estado[0].CasadoID !== id)) {
      throw new Error("No puedes divorciarte de este usuario porque no estan casados entre si");
    }
    profile.save();
    targetProfile.save()
    return profile.toObject()
  }


  async sumarDinero(userDiscordId: number, monto: number): Promise<Profile> {
    const profile = await ProfileModel.findOneAndUpdate(
      { userDiscordId },
      { $inc: { "economia.0.Efectivo": monto } },
      { new: true }
    );
    if (!profile) throw new Error("Perfil no encontrado");
    return profile.toObject();
  }

  async depositarBanco(userDiscordId: number, monto: number): Promise<Profile> {
    const profile = await ProfileModel.findOneAndUpdate(
      { userDiscordId },
      {
        $inc: {
          "economia.0.Efectivo": -monto,
          "economia.0.Banco": monto,
        },
      },
      { new: true }
    );
    if (!profile) throw new Error("Perfil no encontrado");
    return profile.toObject();
  }

  async obtenerPorUserDiscordId(id: number): Promise<Profile | null> {
    const perfil = await ProfileModel.findOne({userDiscordId: id})
    return perfil ? perfil : null
  }
}
