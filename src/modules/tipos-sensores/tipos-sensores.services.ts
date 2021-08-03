import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TiposSensores } from "src/entities/tipos-sensores.entity";
import { BadRequestError, NotFoundError } from "src/models/error";
import { Repository } from "typeorm";
import { AddTipoSensor, UpdateTipoSensor } from "./dto";

@Injectable()
export class TiposSensoresServices {
    
    constructor(@InjectRepository(TiposSensores) private readonly _repo: Repository<TiposSensores>) {}

    async getAll(): Promise<TiposSensores[]> {
        try {
            return this._repo.find({});
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getById(id: string): Promise<TiposSensores> {
        try{
            return this._repo.findOne(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async insert(addTipoSensor: AddTipoSensor): Promise<TiposSensores>{
        try {
            if(!addTipoSensor.createdBy || !addTipoSensor.descripcion){
                throw new BadRequestError("The createdBy and descripcion's fields are required");
            }
            if(!addTipoSensor.lastChangedBy){
                addTipoSensor.lastChangedBy = addTipoSensor.createdBy;
            }
            let tipoSensor: TiposSensores = new TiposSensores();
            Object.assign(tipoSensor, addTipoSensor);
            return this._repo.save(tipoSensor);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(id: string, updateTipoSensor: UpdateTipoSensor): Promise<TiposSensores>{
        try {
            let tipoSensor: TiposSensores =  await this._repo.findOne(id);
            if(!tipoSensor) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            Object.assign(tipoSensor, updateTipoSensor);
            tipoSensor.lastChangedDateTime = new Date();
            return this._repo.save(tipoSensor);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async remove(id: string, username: string): Promise<TiposSensores>{
        try {
            let tipoSensor: TiposSensores =  await this._repo.findOne(id);
            if(!tipoSensor) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            tipoSensor.isActive = false;
            tipoSensor.lastChangedBy = username;
            return this._repo.save(tipoSensor);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}