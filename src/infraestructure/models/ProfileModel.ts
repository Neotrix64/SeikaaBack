import mongoose, {Schema, Document} from "mongoose";

export interface ProfileDocument extends Document {
    userDiscordId: String;
    Estado: {
        CasadoID?: String,
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
  userDiscordId: { type: String, required: false, unique: true },
  Estado: [
    {
      CasadoID: { type: String, required: false, unique: true },
      createdDate: { type: Date, default: Date.now, required: false }
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