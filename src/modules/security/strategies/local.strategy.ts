import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { SecurityServices } from "../security.services";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly securityService: SecurityServices) {
        super();
    }
    
    async validate (username: string, password: string): Promise<Boolean> {
        let result: Boolean = false;
        try {
            result = await this.securityService.login({username: username, password: password});
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException();
        }
        return result;
    }
}