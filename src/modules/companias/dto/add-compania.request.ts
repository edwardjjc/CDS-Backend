import { BaseAddRequest } from "src/models/request/base-add.request";

export class AddCompania extends BaseAddRequest {
    descripcion: string;
    direccion: string;
    telefono: string;
}