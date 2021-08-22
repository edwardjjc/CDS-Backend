import { Body, Controller, Get, Param, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { BaseResponse } from "src/models/response/base.response";
import { JwtAuthGuard } from "../security/guards/jwt.guard";
import { Security } from "../security/dto";
import { UpdateConfiguracion } from "./dto";
import { ConfiguracionesServices } from "./configuraciones.services";

@Controller('configuraciones')
export class ConfiguracionesController {
    constructor(private readonly configuracionesService: ConfiguracionesServices) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async get(): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try{
            response.status = 'success';
            response.message = '';
            response.data =  await this.configuracionesService.get()
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateConfiguracion: UpdateConfiguracion, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            let security: Security = new Security();
            Object.assign(security, req.user);
            updateConfiguracion.lastChangedBy = security.username;
            response.status = 'success';
            response.message = '';
            response.data = await this.configuracionesService.update(id, updateConfiguracion);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}