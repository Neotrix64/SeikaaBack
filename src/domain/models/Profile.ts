// src/domain/models/Profile.ts

export interface Estado {
  CasadoID?: number;
  createdDate: Date;
}

export interface Economia {
  Efectivo?: number;
  Banco?: number;
}

export interface Profile {
  id?: number;
  userDiscordId: number;
  Estado: Estado[];
  exp?: number;
  nivel?: number;
  economia: Economia[];
}
