import { Profile } from "../models/Profile";

export interface ProfileRepository {
    crear(profile: Profile): Promise<Profile>;
    obtenerTodos(): Promise<Profile[]>;
    obtenerPorId(id: number): Promise<Profile | null>;
    sumarDinero(id: number, monto: number): Promise<Profile>;
    depositarBanco(id: number, monto: number): Promise<Profile>;
    obtenerPorUserDiscordId(id: number): Promise<Profile | null>;
    cambiarEstado(id: number, estado: String, idTarget: number): Promise<Profile | null>;
}