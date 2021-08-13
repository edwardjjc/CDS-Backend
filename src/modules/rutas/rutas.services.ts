import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Contenedores, DistanciasContenedores, Rutas, RutasContenedores } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class RutasServices {
    
    constructor(@InjectRepository(Rutas) private readonly _repoRutas: Repository<Rutas>,
                @InjectRepository(RutasContenedores) private readonly _repoRutasCont: Repository<RutasContenedores>,
                @InjectRepository(Contenedores) private readonly _repoContenedores: Repository<Contenedores>,
                @InjectRepository(DistanciasContenedores) private readonly _repoDistancias: Repository<DistanciasContenedores>) {}

    async getAllActive(): Promise<Rutas[]> {
        try {
            return this._repoRutas.find({ where: { isActive: true, isArchived: false } });
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getAllHistory(): Promise<Rutas[]> {
        try {
            return this._repoRutas.find({ where: { isActive: true, isArchived: true } });
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getDetail(id: string): Promise<Rutas> {
        try{
            return this._repoRutas.findOne(id, { relations: ["rutasContenedores", "camion", "contenedor"] });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async insertRutaContenedor(createdBy: string, ruta: Rutas, contenedores: SecuenciaContenedor[]) {
        try {
            for(let i: number = 0; i < contenedores.length; i++){
                let secContenedor: SecuenciaContenedor = contenedores[i];
                let rutaContenedor: RutasContenedores = new RutasContenedores();
                rutaContenedor.createdBy = createdBy;
                rutaContenedor.lastChangedBy = createdBy;
                rutaContenedor.ruta = ruta;
                rutaContenedor.contenedor = secContenedor.contenedor;
                rutaContenedor.orden = secContenedor.orden;
                await this._repoRutasCont.save(rutaContenedor);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

class SecuenciaContenedor {
    contenedor: Contenedores;
    orden: number;
}