import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Configuraciones } from "src/entities";
import { NotFoundError } from "src/models/error";
import { Repository } from "typeorm";
import { UpdateConfiguracion } from "./dto";

@Injectable()
export class ConfiguracionesServices {
    
    constructor(@InjectRepository(Configuraciones) private readonly _repo: Repository<Configuraciones>) {}

    async getAll(): Promise<Configuraciones[]> {
        try {
            return this._repo.find({});
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async update(id: string, updateConfiguracion: UpdateConfiguracion): Promise<Configuraciones>{
        try {
            let configuracion: Configuraciones =  await this._repo.findOne(id);
            if(!configuracion) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            Object.assign(configuracion, updateConfiguracion);
            configuracion.lastChangedDateTime = new Date();
            return this._repo.save(configuracion);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}