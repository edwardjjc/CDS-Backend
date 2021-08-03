import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DispositivosIoT } from "src/entities";
import { BadRequestError, NotFoundError } from "src/models/error";
import { Repository } from "typeorm";
import { AddDispositivoIoT, UpdateDispositivoIoT } from "./dto";

@Injectable()
export class DispositivosIoTServices {
    
    constructor(@InjectRepository(DispositivosIoT) private readonly _repo: Repository<DispositivosIoT>) {}

    async getAll(): Promise<DispositivosIoT[]> {
        try {
            return this._repo.find({});
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getById(id: string): Promise<DispositivosIoT> {
        try{
            return this._repo.findOne(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async insert(addDispositivoIoT: AddDispositivoIoT): Promise<DispositivosIoT>{
        try {
            if(!addDispositivoIoT.createdBy || !addDispositivoIoT.noSerie){
                throw new BadRequestError("The createdBy, noSerie's fields are required");
            }
            if(!addDispositivoIoT.lastChangedBy){
                addDispositivoIoT.lastChangedBy = addDispositivoIoT.createdBy;
            }
            let dispositivoIoT: DispositivosIoT = new DispositivosIoT();
            Object.assign(dispositivoIoT, addDispositivoIoT);
            return this._repo.save(dispositivoIoT);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(id: string, updateDispositivoIoT: UpdateDispositivoIoT): Promise<DispositivosIoT>{
        try {
            let dispositivoIoT: DispositivosIoT =  await this._repo.findOne(id);
            if(!dispositivoIoT) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            Object.assign(dispositivoIoT, updateDispositivoIoT);
            dispositivoIoT.lastChangedDateTime = new Date();
            return this._repo.save(dispositivoIoT);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async remove(id: string, username: string): Promise<DispositivosIoT>{
        try {
            let dispositivoIoT: DispositivosIoT =  await this._repo.findOne(id);
            if(!dispositivoIoT) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            dispositivoIoT.isActive = false;
            dispositivoIoT.lastChangedBy = username;
            return this._repo.save(dispositivoIoT);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}