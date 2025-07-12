import { Profile } from "../models/profile";

export interface ProfileRepository {
    crear(profile: Profile): Promise<Profile>;
    obtenerTodos(): Promise<Profile[]>;
    obtenerPorId(id: number): Promise<Profile | null>;
    sumarDinero(id: number, monto: number): Promise<Profile>;
    depositarBanco(id: number, monto: number): Promise<Profile>;
}