import { Contenedores } from "src/entities";
import { BaseAddRequest } from "src/models/request/base-add.request";

export class AddDistanciaContenedor extends BaseAddRequest {
    contenedorOrigen: Contenedores;
    contenedorDestino: Contenedores;
    distancia?: number;
    distanciaStr?: string;
}