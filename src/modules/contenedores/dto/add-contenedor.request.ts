import { TiposContenedores } from "src/entities";
import { BaseAddRequest } from "src/models/request/base-add.request";

export class AddContenedor extends BaseAddRequest {
    tipoContenedor: TiposContenedores;
    descripcion: string;
    direccion: string;
    gpsLatitude: number;
    gpsAltitude: number;
}