import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DispositivosIoT, Lecturas, TiposSensores } from "src/entities";
import { BadRequestError, NotFoundError } from "src/models/error";
import { Repository } from "typeorm";
import { AddLectura } from "./dto";

@Injectable()
export class LecturasServices {
    
    constructor(@InjectRepository(Lecturas) private readonly _repo: Repository<Lecturas>, 
                @InjectRepository(DispositivosIoT) private readonly diotRepo: Repository<DispositivosIoT>,
                @InjectRepository(TiposSensores) private readonly tsRepo: Repository<TiposSensores>) {}

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
            if(!addLectura.createdBy || !addLectura.lectura){
                throw new BadRequestError("The createdBy, lectura's fields are required");
            }
            if(!addLectura.lastChangedBy){
                addLectura.lastChangedBy = addLectura.createdBy;
            }
            let lectura: Lecturas = new Lecturas();
            Object.assign(lectura, addLectura);
            lectura.dispositivoIoT = await this.diotRepo.findOne({ where: { noSerie: addLectura.noSerie } });
            lectura.tipoSensor = await this.tsRepo.findOne({ where: { descripcion: addLectura.tipoSensor } });
            return this._repo.save(lectura);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async remove(id: string): Promise<Lecturas>{
        try {
            let lectura: Lecturas =  await this._repo.findOne(id);
            if(!lectura) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            lectura.isActive = false;
            return this._repo.save(lectura);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}