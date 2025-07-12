import mongoose, {Schema, Document} from "mongoose";

export interface ProfileDocument extends Document {
    userDiscordID: number;
    Estado: {
        CasadoId?: number,
        createdDate: Date,
    }[];
    exp: number,
    nivel: number,
    economia: {
        Efectivo: number,
        Banco: number,
    }[];
}

const ProfileSchema: Schema = new Schema({
  userDiscordID: { type: Number, required: true },
  Estado: [
    {
      CasadoID: { type: Number },
      createdDate: { type: Date, default: Date.now }
    }
  ],
  exp: { type: Number, default: 0 },
  nivel: { type: Number, default: 0 },
  economia: [
    {
      Efectivo: { type: Number, default: 0 },
      Banco: { type: Number, default: 0 }
    }
  ]
})

export const ProfileModel = mongoose.model<ProfileDocument>('profile', ProfileSchema)