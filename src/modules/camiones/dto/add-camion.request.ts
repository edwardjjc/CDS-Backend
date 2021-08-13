import { Companias, TiposCamiones } from "src/entities";
import { BaseAddRequest } from "src/models/request/base-add.request";

export class AddCamion extends BaseAddRequest {
    compania: Companias;
    tipoCamion: TiposCamiones;
    descripcion: string;
    identificadorUnico: string;
    marca: string;
    modelo: string;
    anio: number;
    color: string;
}