import { Contenedores } from "src/entities";
import { BaseUpdateRequest } from "src/models/request/base-update.request";

export class UpdateDispositivoIoT extends BaseUpdateRequest {
    contenedor: Contenedores;
    noSerie: string;
}