import { hash } from "bcrypt";
import { configService } from "src/config/app.config";
import { JwtConfig } from "src/models/config";
import { Security } from "./dto";

export class SecurityLogin {

    private static securityLoginInstance: SecurityLogin;
    private loginList: Security[] = [];

    private constructor () {}

    static async getInstance(): Promise<SecurityLogin> {
        if (!this.securityLoginInstance) {
            this.securityLoginInstance =  new SecurityLogin();
        }
        return this.securityLoginInstance;
    }

    async setUserToken(login: Security): Promise<string> {
        let currentDate: Date = new Date();
        let jwtConfig: JwtConfig = configService.getJwtConfig();
        let token: string = login.username + currentDate.toString() + String(Math.random() * 1000)
        try {
            login.token = await hash(token, 10);
            login.valido_hasta = new Date(currentDate.getTime() + jwtConfig.jwtExpires)
            this.loginList.push(login);
        } catch (error) {
            console.log(error);
            throw error;
        }
        return token;
    }

    async logoutToken(token: string) {
        try {
            let login = this.loginList.find(security => security.token == token);
            await this.removeToken(login);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async validateToken(token: string): Promise<Boolean> {
        let tokenIsValid: Boolean = false;
        try {
            let login: Security = this.loginList.find(security => security.token == token);
            let currentDate: Date = new Date();
            if (login == undefined) {
                tokenIsValid = false;
            } else if (currentDate <= login.valido_hasta) {
                tokenIsValid = true;
                this.refreshToken(login);
            } else {
                tokenIsValid = false;
                this.removeToken(login);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
        return tokenIsValid;
    }

    private async refreshToken(login: Security){
        try {
            let jwtConfig: JwtConfig = configService.getJwtConfig();
            let currentDate: Date = new Date();
            login.valido_hasta = new Date(currentDate.getTime() + jwtConfig.jwtExpires)
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    private async removeToken(login: Security){
        try {
            let index = this.loginList.indexOf(login);
            if (index > -1){
                this.loginList.splice(index, 1);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}