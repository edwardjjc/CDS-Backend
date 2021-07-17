import { TiposContenedores } from "src/entities";
import { BaseUpdateRequest } from "src/models/request/base-update.request";

export class UpdateContenedor extends BaseUpdateRequest {
    tipoContenedor: TiposContenedores;
    descripcion: string;
    direccion: string;
    gpsLatitude: number;
    gpsAltitude: number;
}