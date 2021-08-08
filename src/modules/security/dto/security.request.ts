import { Perfiles } from "src/entities";

export class Security {
    user_id: string;
    username: string;
    email: string;
    perfil: Perfiles;
    valido_hasta: Date;
    token: string;
}