import { Companias, TiposCamiones } from "src/entities";
import { BaseUpdateRequest } from "src/models/request/base-update.request";

export class UpdateCamion extends BaseUpdateRequest {
    compania: Companias;
    tipoCamion: TiposCamiones;
    descripcion: string;
    identificadorUnico: string;
    marca: string;
    modelo: string;
    anio: number;
    color: string;
}