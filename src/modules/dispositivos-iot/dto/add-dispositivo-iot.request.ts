import { Contenedores } from "src/entities";
import { BaseAddRequest } from "src/models/request/base-add.request";

export class AddDispositivoIoT extends BaseAddRequest {
    contenedor: Contenedores;
    noSerie: string;
}