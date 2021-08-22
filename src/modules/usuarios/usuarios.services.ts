import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Perfiles, Usuarios } from "src/entities";
import { BadRequestError, NotFoundError } from "src/models/error";
import { Repository } from "typeorm";
import { AddUsuario } from "./dto";
import { SecurityServices } from "../security/security.services";

@Injectable()
export class UsuariosServices {

    private securityService: SecurityServices;
    
    constructor(@InjectRepository(Usuarios) private readonly _repo: Repository<Usuarios>,
                @InjectRepository(Perfiles) private readonly _repoPerf: Repository<Perfiles>) {}

    async getAll(): Promise<Usuarios[]> {
        try {
            return this._repo.find({ select: ["id", "createdBy", "createDateTime", "lastChangedBy", "lastChangedDateTime", "isActive", "isArchived", "internalComment", "username", "email", "perfil"], relations: ["perfil"] });
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getPerfiles(): Promise<Perfiles[]> {
        try {
            return this._repoPerf.find({  });
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getById(id: string): Promise<Usuarios> {
        try{
            return this._repo.findOne(id, { select: ["id", "createdBy", "createDateTime", "lastChangedBy", "lastChangedDateTime", "isActive", "isArchived", "internalComment", "username", "email", "perfil"], relations: ["perfil"] });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async insert(addUsuario: AddUsuario): Promise<Usuarios>{
        try {
            if(!addUsuario.createdBy || !addUsuario.username || !addUsuario.password || !addUsuario.email || !addUsuario.perfil){
                throw new BadRequestError("The createdBy, username, password, email and perfil's fields are required");
            }
            if(!addUsuario.lastChangedBy){
                addUsuario.lastChangedBy = addUsuario.createdBy;
            }
            let usuario: Usuarios = new Usuarios();
            Object.assign(usuario, addUsuario);
            return this._repo.save(usuario);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async remove(id: string, username: string): Promise<Usuarios>{
        try {
            let usuario: Usuarios =  await this._repo.findOne(id);
            if(!usuario) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            usuario.isActive = false;
            usuario.lastChangedBy = username;
            return this._repo.save(usuario);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}