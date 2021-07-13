import { BaseUpdateRequest } from "src/models/request/base-update.request";

export class UpdateCompania extends BaseUpdateRequest {
    descripcion: string;
    direccion: string
    telefono: string;
}