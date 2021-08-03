import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuarios } from "src/entities";
import { BadRequestError, NotFoundError } from "src/models/error";
import { Repository } from "typeorm";
import { Login, UpdatePassword } from "./dto";
import { SecurityEvaluatorService } from "./security-evaluator.services";

@Injectable()
export class SecurityServices {

    constructor(@InjectRepository(Usuarios) private readonly _repo: Repository<Usuarios>,
                private readonly securityEvaluatorService: SecurityEvaluatorService) {}

    async login(login: Login): Promise<any> {
        try {
            let usuario: Usuarios =  await this._repo.findOne({ relations: ["perfil"], where: { username: login.username } });
            if(!usuario) {
                throw new NotFoundError(`Nombre de Usuario o Password Incorrecto`);
            }
            let areEquals: Boolean = await this.securityEvaluatorService.evalPassword(usuario, login.password);
            if(!areEquals) {
                throw new NotFoundError(`Nombre de Usuario o Password Incorrecto`);
            }
            let token = await this.securityEvaluatorService.login(usuario);
            return token;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async logout(token: string) {
        try {
            await this.securityEvaluatorService.logout(token);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updatePassword(id: string, updateUserPassword: UpdatePassword): Promise<Usuarios>{
        try {
            let usuario: Usuarios =  await this._repo.findOne(id);
            if(!usuario) {
                throw new NotFoundError(`The object with id ${id} was not found`);
            }
            let areEquals: Boolean = await this.securityEvaluatorService.evalPassword(usuario, updateUserPassword.oldPassword);
            if(!areEquals) {
                throw new BadRequestError(`Password anterior incorrecto para usuario ${usuario.username}`);
            }
            usuario.password = updateUserPassword.newPassword;
            usuario.lastChangedDateTime = new Date();
            return this._repo.save(usuario);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}