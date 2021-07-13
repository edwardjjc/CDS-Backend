import { BaseUpdateRequest } from "src/models/request/base-update.request";

export class UpdateTipoCamion extends BaseUpdateRequest {
    descripcion: string;
    cantidadMetros: number;
}