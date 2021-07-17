import { DispositivosIoT, TiposSensores } from "src/entities";
import { BaseAddRequest } from "src/models/request/base-add.request";

export class AddLectura extends BaseAddRequest {
    dispositivoIoT: DispositivosIoT;
    tipoSenson: TiposSensores;
    lectura: number;
}