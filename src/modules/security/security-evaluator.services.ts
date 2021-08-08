import { Injectable } from "@nestjs/common";
import { Security } from "./dto";
import { compare } from 'bcrypt';
import { Usuarios } from "src/entities";
import { JwtService } from "@nestjs/jwt";
import { SecurityLogin } from "./security-login.services";

@Injectable()
export class SecurityEvaluatorService {

    private securityLogin: SecurityLogin;

    constructor(private jwtService: JwtService) {
    }

    async evalPassword (usuario: Usuarios, password: string): Promise<Boolean> {
        let result: Boolean = false;
        try {
            result = await compare(password, usuario.password);
        } catch (error) {
            console.log(error);
            throw error;
        }
        return result;
    }
    
    async login(usuario: Usuarios): Promise<any> {
        this.securityLogin = await SecurityLogin.getInstance();
        let payload = {username: "",email:"",perfil:{},token:""};
        let security: Security = new Security();
        try {
            security.user_id = usuario.id;
            security.username = usuario.username;
            security.email = usuario.email;
            security.perfil = usuario.perfil;
            await this.securityLogin.setUserToken(security);
            Object.assign(payload, security);
            return { access_token: this.jwtService.sign(payload) };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async logout(token: string){
        this.securityLogin = await SecurityLogin.getInstance();
        try {
            await this.securityLogin.logoutToken(token);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async validateToken(token: string): Promise<Boolean> {
        this.securityLogin = await SecurityLogin.getInstance();
        let tokenIsValid: Boolean = false;
        try {
            let login: Security = await this.jwtService.verify(token);
            if (login == undefined) {
                tokenIsValid = false;
            } else {
                tokenIsValid = await this.securityLogin.validateToken(login.token);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
        return tokenIsValid;
    }
}