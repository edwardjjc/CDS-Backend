import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Configuraciones, Contenedores, DispositivosIoT, Lecturas, TiposContenedores, TiposSensores } from "src/entities";
import { BadRequestError, NotFoundError } from "src/models/error";
import { Repository } from "typeorm";
import { AddLectura } from "./dto";

@Injectable()
export class LecturasServices {
    
    constructor(@InjectRepository(Lecturas) private readonly _repo: Repository<Lecturas>, 
                @InjectRepository(DispositivosIoT) private readonly diotRepo: Repository<DispositivosIoT>,
                @InjectRepository(TiposSensores) private readonly tsRepo: Repository<TiposSensores>,
                @InjectRepository(TiposContenedores) private readonly tcRepo: Repository<TiposContenedores>,
                @InjectRepository(Contenedores) private readonly contRepo: Repository<Contenedores>,
                @InjectRepository(Configuraciones) private readonly confRepo: Repository<Configuraciones>) {}

    async getAll(): Promise<Lecturas[]> {
        try {
            return this._repo.find({});
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getById(id: string): Promise<Lecturas> {
        try{
            return this._repo.findOne(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async insert(addLectura: AddLectura): Promise<Lecturas>{
        try {
            if(!addLectura.createdBy || !addLectura.lectura || !addLectura.noSerie || !addLectura.tipoSensor){
                throw new BadRequestError("The createdBy, lectura's fields are required");
            }
            if(!addLectura.lastChangedBy){
                addLectura.lastChangedBy = addLectura.createdBy;
            }
            let dispositivoIoT: DispositivosIoT = await this.diotRepo.findOne({ where: { noSerie: addLectura.noSerie }, relations: ["contenedor", "contenedor.tipoContenedor"] });
            let lectura: Lecturas = new Lecturas();
            this.updateContenedor(dispositivoIoT.contenedor, addLectura.lectura);
            Object.assign(lectura, addLectura);
            lectura.dispositivoIoT = dispositivoIoT;
            lectura.tipoSensor = await this.tsRepo.findOne({ where: { descripcion: addLectura.tipoSensor } });
            return this._repo.save(lectura);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateContenedor(contenedor: Contenedores, lectura: number){
        try {
            const configuraciones: Configuraciones = await this.confRepo.findOne();
            const porcMetrosLectura: number = ((lectura / 100) / contenedor.tipoContenedor.cantidadMetros) * 100;
            if (porcMetrosLectura >= configuraciones.porcentajeMaxContenedores) {
                contenedor.pendienteRecoleccion = true;
            } else {
                contenedor.pendienteRecoleccion = false;
            }
            this.contRepo.save(contenedor)
        } catch (error) {
            console.log(error);
        }
    }

    async remove(id: string, username: string): Promise<Lecturas>{
        try {
            let lectura: Lecturas =  await this._repo.findOne(id);
            if(!lectura) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            lectura.isActive = false;
            lectura.lastChangedBy = username;
            return this._repo.save(lectura);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}