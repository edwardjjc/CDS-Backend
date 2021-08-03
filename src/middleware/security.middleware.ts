import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { configService } from "src/config/app.config";
import { BaseResponse } from "src/models/response/base.response";
import { SecurityEvaluatorService } from "src/modules/security/security-evaluator.services";

@Injectable()
export class SecurityMiddleware implements NestMiddleware {

    constructor(private readonly securityService: SecurityEvaluatorService) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        let response: BaseResponse = new BaseResponse();
        try {
            let access_token = req.cookies[configService.cookieKey].access_token;
            let tokenIsValid = await this.securityService.validateToken(access_token);
            if (tokenIsValid) {
                req.body.security = await this.securityService.decodeToken(access_token);
                next();
            } else {
                response.status = 'fail';
                response.message = "Usuario no autenticado o tiempo de token expirado";
                res.status(401).send(response)
            }
        } catch (error) {
            console.log(error)
            response.status = 'fail';
            response.message = error.message;
            res.status(500).send(response)
        }
    }

}