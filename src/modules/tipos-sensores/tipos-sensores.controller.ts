import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { BaseResponse } from "src/models/response/base.response";
import { Security } from "../security/dto";
import { JwtAuthGuard } from "../security/guards/jwt.guard";
import { AddTipoSensor, UpdateTipoSensor } from "./dto";
import { TiposSensoresServices } from "./tipos-sensores.services";

@Controller('tipos-sensores')
export class TiposSensoresController {
    constructor(private readonly tiposSensoresService: TiposSensoresServices) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try{
            response.status = 'success';
            response.message = '';
            response.data =  await this.tiposSensoresService.getAll()
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            response.status = 'success';
            response.message = '';
            response.data =  await this.tiposSensoresService.getById(id);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() addTipoSensor: AddTipoSensor, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            let security: Security = new Security();
            Object.assign(security, req.user);
            addTipoSensor.createdBy = security.username;
            response.status = 'success';
            response.message = '';
            response.data = await this.tiposSensoresService.insert(addTipoSensor);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTipoSensor: UpdateTipoSensor, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            let security: Security = new Security();
            Object.assign(security, req.user);
            updateTipoSensor.lastChangedBy = security.username;
            response.status = 'success';
            response.message = '';
            response.data = await this.tiposSensoresService.update(id, updateTipoSensor);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            let security: Security = new Security();
            Object.assign(security, req.user);
            response.status = 'success';
            response.message = '';
            response.data = await this.tiposSensoresService.remove(id, security.username);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}