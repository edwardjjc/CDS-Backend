import { BaseUpdateRequest } from "src/models/request/base-update.request";

export class UpdateTipoContenedor extends BaseUpdateRequest {
    descripcion: string;
    dimensiones: string;
    cantidadMetros: number;
}