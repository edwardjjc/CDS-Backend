import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { configService } from "src/config/app.config";
import { BaseResponse } from "src/models/response/base.response";
import { SecurityLogin } from "../security-login.services";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    private securityLogin: SecurityLogin;

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.getJwtConfig().jwtSecret
        });
    }

    async validate(payload: any) {
        this.securityLogin = await SecurityLogin.getInstance();
        let response: BaseResponse = new BaseResponse();
        let result: any = {}
        try {
            let tokenIsValid = await this.securityLogin.validateToken(payload.token);
            if (tokenIsValid) {
                result = payload;
            } else {
                response.status = 'fail';
                response.message = 'Usuario no autenticado o tiempo de token expirado';
                throw new UnauthorizedException(response);
            }
        } catch (error) {
            console.log(error);
            response.status = 'fail';
            response.message = 'Usuario no autenticado o tiempo de token expirado';
            throw new UnauthorizedException(response);
        }
        return result;
    }
}