import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Companias } from "src/entities/companias.entity";
import { BadRequestError, NotFoundError } from "src/models/error";
import { AddCompania, UpdateCompania } from "src/modules/companias/dto";
import { ObjectID, Repository } from "typeorm";

@Injectable()
export class CompaniasServices {
    
    constructor(@InjectRepository(Companias) private readonly _repo: Repository<Companias>) {}

    async getAll(): Promise<Companias[]> {
        try {
            return this._repo.find({});
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getById(id: string): Promise<Companias> {
        try{
            return this._repo.findOne(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async insert(addCompania: AddCompania): Promise<Companias>{
        try {
            if(!addCompania.createdBy || !addCompania.descripcion  || !addCompania.direccion || !addCompania.telefono){
                throw new BadRequestError("The createdBy, descripcion, direccion and telefono's fields are required");
            }
            if(!addCompania.lastChangedBy){
                addCompania.lastChangedBy = addCompania.createdBy;
            }
            let compania: Companias = new Companias();
            Object.assign(compania, addCompania);
            return this._repo.save(compania);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(id: string, updateCompania: UpdateCompania): Promise<Companias>{
        try {
            let compania: Companias =  await this._repo.findOne(id);
            if(!compania) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            Object.assign(compania, updateCompania);
            compania.lastChangedDateTime = new Date();
            return this._repo.save(compania);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async remove(id: string): Promise<Companias>{
        try {
            let compania: Companias =  await this._repo.findOne(id);
            if(!compania) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            compania.isActive = false;
            return this._repo.save(compania);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}