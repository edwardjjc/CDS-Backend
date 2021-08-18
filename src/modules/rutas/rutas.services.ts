import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Camiones, Contenedores, DistanciasContenedores, Rutas, RutasContenedores } from "src/entities";
import { Repository } from "typeorm";
import { Distancias } from "../distancias-contenedores/dto/distancias.response";
import { Kopt } from "./tsp-worker/k-opt.worker";
import { Solucion } from "./tsp-worker/solucion.worker";

@Injectable()
export class RutasServices {
    
    constructor(@InjectRepository(Rutas) private readonly _repoRutas: Repository<Rutas>,
                @InjectRepository(RutasContenedores) private readonly _repoRutasCont: Repository<RutasContenedores>,
                @InjectRepository(Camiones) private readonly _repoCamiones: Repository<Camiones>,
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
            return this._repoRutas.findOne(id, { relations: ["rutasContenedores", "camion", "rutasContenedores.contenedor"] });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async create(distancias: Distancias): Promise<any> {
        try{
            let camiones = await this._repoCamiones.find({ where: { isActive: true } });
            if (camiones.length <= 0) {
                throw new BadRequestException("No existen camiones con estatus activo");
            }
            if (distancias.contenedores.length < 2) {
                throw new BadRequestException("No existen contenedores pendientes de recoleccion");
            }
            let solucion = await this.solveTSP(distancias);
            let contenedoresARecolectar = solucion.individuo.slice(1, solucion.individuo.length - 1);
            let cantContenedoresxCamion = Math.ceil(contenedoresARecolectar.length / camiones.length);
            let contenedorActual: number = 1;
            let listaRutas: ListaRutas[] = [];
            for(let i = 0; i < camiones.length; i++){
                let secuenciaContenedores: SecuenciaContenedor[] = [];
                for(let j = 1; j <= cantContenedoresxCamion; j++){
                    if(contenedorActual <= contenedoresARecolectar.length){
                        let contC = solucion.contenedores[contenedorActual];
                        secuenciaContenedores.push({ contenedor: contC.id, orden: j});
                        contenedorActual++;
                    }
                }
                listaRutas.push({ camion: camiones[i], secuencias: secuenciaContenedores });
            }

            listaRutas.forEach(async (value, index, array) => {
                let newRuta: Rutas = new Rutas();
                const createdBy = "admin";
                newRuta.camion = array[index].camion;
                newRuta.createdBy = createdBy;
                newRuta.lastChangedBy = createdBy;
                let savedRuta = await this._repoRutas.save(newRuta);
                this.insertRutaContenedor(createdBy, savedRuta, array[index].secuencias);
            })

            return listaRutas;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async solveTSP(distancias: Distancias): Promise<Solucion> {
        let matrix: any[] = distancias.matrix;
        let solucion = new Solucion(matrix, null);
        let kopt = new Kopt(matrix);
        solucion.individuo = await kopt.solve();
        solucion.evaluar(distancias.contenedores);
        return solucion;
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

class ListaRutas {
    camion: Camiones;
    secuencias: SecuenciaContenedor[];
}

class SecuenciaContenedor {
    contenedor: Contenedores;
    orden: number;
}