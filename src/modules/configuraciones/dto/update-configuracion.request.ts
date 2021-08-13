import { BaseUpdateRequest } from "src/models/request/base-update.request";

export class UpdateConfiguracion extends BaseUpdateRequest {
    porcentajeMaxContenedores: number;
    direccionPuntoOrigen: string;
    gpsLatitudePuntoOrigen: number;
    gpsAltitudePuntoOrigen: number;
    direccionPuntoDestino: string;
    gpsLatitudePuntoDestino: number;
    gpsAltitudePuntoDestino: number;
    fechaUltimaConstruccion: Date;
}