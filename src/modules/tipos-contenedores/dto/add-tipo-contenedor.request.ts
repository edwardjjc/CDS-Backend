import { BaseAddRequest } from "src/models/request/base-add.request";

export class AddTipoContenedor extends BaseAddRequest {
    descripcion: string;
    dimensiones: string;
    cantidadMetros: number;
}