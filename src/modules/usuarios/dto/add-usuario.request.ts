import { Perfiles } from "src/entities/";
import { BaseAddRequest } from "src/models/request/base-add.request";

export class AddUsuario extends BaseAddRequest {
    username: string;
    password: string;
    perfil: Perfiles;
    email: string;
}