import { BaseAddRequest } from "src/models/request/base-add.request";

export class AddLectura extends BaseAddRequest {
    noSerie: string;
    tipoSensor: string;
    lectura: number;
}