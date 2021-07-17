import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Contenedores } from "src/entities";
import { BadRequestError, NotFoundError } from "src/models/error";
import { Repository } from "typeorm";
import { AddContenedor, UpdateContenedor } from "./dto";

@Injectable()
export class ContenedoresServices {
    
    constructor(@InjectRepository(Contenedores) private readonly _repo: Repository<Contenedores>) {}

    async getAll(): Promise<Contenedores[]> {
        try {
            return this._repo.find({});
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getById(id: string): Promise<Contenedores> {
        try{
            return this._repo.findOne(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async insert(addContenedor: AddContenedor): Promise<Contenedores>{
        try {
            if(!addContenedor.createdBy || !addContenedor.descripcion  || !addContenedor.direccion){
                throw new BadRequestError("The createdBy, descripcion, direccion and telefono's fields are required");
            }
            if(!addContenedor.lastChangedBy){
                addContenedor.lastChangedBy = addContenedor.createdBy;
            }
            let contenedor: Contenedores = new Contenedores();
            Object.assign(contenedor, addContenedor);
            return this._repo.save(contenedor);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(id: string, updateContenedor: UpdateContenedor): Promise<Contenedores>{
        try {
            let contenedor: Contenedores =  await this._repo.findOne(id);
            if(!contenedor) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            Object.assign(contenedor, updateContenedor);
            contenedor.lastChangedDateTime = new Date();
            return this._repo.save(contenedor);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async remove(id: string): Promise<Contenedores>{
        try {
            let contenedor: Contenedores =  await this._repo.findOne(id);
            if(!contenedor) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            contenedor.isActive = false;
            return this._repo.save(contenedor);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}