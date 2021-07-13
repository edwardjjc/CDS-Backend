import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TiposContenedores } from "src/entities/tipos-contenedores.entity";
import { BadRequestError, NotFoundError } from "src/models/error";
import { Repository } from "typeorm";
import { AddTipoContenedor, UpdateTipoContenedor } from "./dto";

@Injectable()
export class TiposContenedoresServices {
    
    constructor(@InjectRepository(TiposContenedores) private readonly _repo: Repository<TiposContenedores>) {}

    async getAll(): Promise<TiposContenedores[]> {
        try {
            return this._repo.find({});
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getById(id: string): Promise<TiposContenedores> {
        try{
            return this._repo.findOne(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async insert(addTipoContenedor: AddTipoContenedor): Promise<TiposContenedores>{
        try {
            if(!addTipoContenedor.createdBy || !addTipoContenedor.descripcion  || !addTipoContenedor.cantidadMetros || !addTipoContenedor.dimensiones){
                throw new BadRequestError("The createdBy, descripcion, direccion and cantidadMetros's fields are required");
            }
            if(!addTipoContenedor.lastChangedBy){
                addTipoContenedor.lastChangedBy = addTipoContenedor.createdBy;
            }
            let tipoContenedor: TiposContenedores = new TiposContenedores();
            Object.assign(tipoContenedor, addTipoContenedor);
            return this._repo.save(tipoContenedor);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(id: string, updateTipoContenedor: UpdateTipoContenedor): Promise<TiposContenedores>{
        try {
            let tipoContenedor: TiposContenedores =  await this._repo.findOne(id);
            if(!tipoContenedor) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            Object.assign(tipoContenedor, updateTipoContenedor);
            tipoContenedor.lastChangedDateTime = new Date();
            return this._repo.save(tipoContenedor);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async remove(id: string): Promise<TiposContenedores>{
        try {
            let tipoContenedor: TiposContenedores =  await this._repo.findOne(id);
            if(!tipoContenedor) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            tipoContenedor.isActive = false;
            return this._repo.save(tipoContenedor);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}