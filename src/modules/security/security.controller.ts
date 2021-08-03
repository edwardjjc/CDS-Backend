import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { Response, Request } from "express";
import { configService } from "src/config/app.config";
import { BaseResponse } from "src/models/response/base.response";
import { Login } from "./dto";
import { SecurityServices } from "./security.services";

@Controller('auth')
export class SecurityController {

    constructor(private readonly securityService: SecurityServices) {}

    @Post('login')
    async login(@Body() login: Login, @Res({ passthrough: true }) res: Response): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            let token: string = await this.securityService.login(login)
            response.status = 'success';
            response.message = 'Login satisfactorio';
            response.data = token;
            res.cookie(configService.cookieKey, token);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @Post('logout')
    async logout(@Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            await this.securityService.logout(req.body.security.token)
            response.status = 'success';
            response.message = 'Logout satisfactorio';
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}