import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TiposCamiones } from "src/entities/tipos-camiones.entity";
import { BadRequestError, NotFoundError } from "src/models/error";
import { AddTipoCamion, UpdateTipoCamion } from "src/models/request/tipos-camiones";
import { Repository } from "typeorm";

@Injectable()
export class TiposCamionesServices {
    
    constructor(@InjectRepository(TiposCamiones) private readonly _repo: Repository<TiposCamiones>) {}

    async getAll(): Promise<TiposCamiones[]> {
        try {
            return this._repo.find({});
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getById(id: string): Promise<TiposCamiones> {
        try{
            return this._repo.findOne(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async insert(addTipoCamion: AddTipoCamion): Promise<TiposCamiones>{
        try {
            if(!addTipoCamion.createdBy || !addTipoCamion.descripcion  || !addTipoCamion.cantidadMetros){
                throw new BadRequestError("The createdBy, descripcion, direccion and telefono's fields are required");
            }
            if(!addTipoCamion.lastChangedBy){
                addTipoCamion.lastChangedBy = addTipoCamion.createdBy;
            }
            let tipoCamion: TiposCamiones = new TiposCamiones();
            Object.assign(tipoCamion, addTipoCamion);
            return this._repo.save(tipoCamion);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(id: string, updateTipoCamion: UpdateTipoCamion): Promise<TiposCamiones>{
        try {
            let tipoCamion: TiposCamiones =  await this._repo.findOne(id);
            if(!tipoCamion) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            Object.assign(tipoCamion, updateTipoCamion);
            tipoCamion.lastChangedDateTime = new Date();
            return this._repo.save(tipoCamion);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async remove(id: string): Promise<TiposCamiones>{
        try {
            let tipoCamion: TiposCamiones =  await this._repo.findOne(id);
            if(!tipoCamion) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            tipoCamion.isActive = false;
            return this._repo.save(tipoCamion);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}