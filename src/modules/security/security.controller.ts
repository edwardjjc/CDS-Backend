import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { configService } from "src/config/app.config";
import { JwtConfig } from "src/models/config";
import { BaseResponse } from "src/models/response/base.response";
import { Login } from "./dto";
import { LocalGuard } from "./guards/local.guard";
import { SecurityServices } from "./security.services";

@Controller('auth')
export class SecurityController {

    constructor(private readonly securityService: SecurityServices) {}

    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Body() login: Login, @Res({ passthrough: true }) res: Response): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        let jwtConfig: JwtConfig = configService.getJwtConfig();
        try {
            let token: any = await this.securityService.login(login)
            response.status = 'success';
            response.message = 'Login satisfactorio';
            response.data = token;
            res.cookie(jwtConfig.cookieKey, token.access_token);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}