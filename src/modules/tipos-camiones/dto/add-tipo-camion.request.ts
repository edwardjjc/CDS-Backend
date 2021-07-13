import { BaseAddRequest } from "src/models/request/base-add.request";

export class AddTipoCamion extends BaseAddRequest {
    descripcion: string;
    cantidadMetros: number;
}