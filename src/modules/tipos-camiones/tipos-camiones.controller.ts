import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { Request } from "express";
import { AddTipoCamion, UpdateTipoCamion } from "src/modules/tipos-camiones/dto";
import { BaseResponse } from "src/models/response/base.response";
import { TiposCamionesServices } from "src/modules/tipos-camiones/tipos-camiones.services";

@Controller('tipos-camiones')
export class TiposCamionesController {
    constructor(private readonly tiposCamionesService: TiposCamionesServices) {}

    @Get()
    async getAll(): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try{
            response.status = 'success';
            response.message = '';
            response.data =  await this.tiposCamionesService.getAll()
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            response.status = 'success';
            response.message = '';
            response.data =  await this.tiposCamionesService.getById(id);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @Post()
    async create(@Body() addTipoCamion: AddTipoCamion, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            const security = req.body.security;
            addTipoCamion.createdBy = security.username;
            response.status = 'success';
            response.message = '';
            response.data = await this.tiposCamionesService.insert(addTipoCamion);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTipoCamion: UpdateTipoCamion, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            const security = req.body.security;
            updateTipoCamion.lastChangedBy = security.username;
            response.status = 'success';
            response.message = '';
            response.data = await this.tiposCamionesService.update(id, updateTipoCamion);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            const security = req.body.security;
            response.status = 'success';
            response.message = '';
            response.data = await this.tiposCamionesService.remove(id, security.username);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}