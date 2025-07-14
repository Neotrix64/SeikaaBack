// src/domain/models/Profile.ts

export interface Estado {
  CasadoID?: String;
  createdDate: Date;
}

export interface Economia {
  Efectivo?: number;
  Banco?: number;
}

export interface Profile {
  id?: number;
  userDiscordId: String;
  Estado: Estado[];
  exp?: number;
  nivel?: number;
  economia: Economia[];
}
