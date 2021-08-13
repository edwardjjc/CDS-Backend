import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Camiones } from "src/entities";
import { BadRequestError, NotFoundError } from "src/models/error";
import { Repository } from "typeorm";
import { AddCamion, UpdateCamion } from "./dto";

@Injectable()
export class CamionesServices {
    
    constructor(@InjectRepository(Camiones) private readonly _repo: Repository<Camiones>) {}

    async getAll(): Promise<Camiones[]> {
        try {
            return this._repo.find({});
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getById(id: string): Promise<Camiones> {
        try{
            return this._repo.findOne(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async insert(addCamion: AddCamion): Promise<Camiones>{
        try {
            if(!addCamion.createdBy || !addCamion.descripcion  || !addCamion.tipoCamion || !addCamion.compania){
                throw new BadRequestError("The createdBy, descripcion, tipoCamion and compania's fields are required");
            }
            if(!addCamion.lastChangedBy){
                addCamion.lastChangedBy = addCamion.createdBy;
            }
            let camion: Camiones = new Camiones();
            Object.assign(camion, addCamion);
            return this._repo.save(camion);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(id: string, updateCamion: UpdateCamion): Promise<Camiones>{
        try {
            let camion: Camiones =  await this._repo.findOne(id);
            if(!camion) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            Object.assign(camion, updateCamion);
            camion.lastChangedDateTime = new Date();
            return this._repo.save(camion);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async remove(id: string, username: string): Promise<Camiones>{
        try {
            let camion: Camiones =  await this._repo.findOne(id);
            if(!camion) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            camion.isActive = false;
            camion.lastChangedBy = username;
            return this._repo.save(camion);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}