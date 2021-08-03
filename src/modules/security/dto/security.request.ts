import { Perfiles } from "src/entities";

export class Security {
    username: string;
    email: string;
    perfil: Perfiles;
    valido_hasta: Date;
    token: string;
}