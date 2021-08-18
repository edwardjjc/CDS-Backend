import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { BaseResponse } from "src/models/response/base.response";
import { Security } from "../security/dto";
import { JwtAuthGuard } from "../security/guards/jwt.guard";
import { AddTipoContenedor, UpdateTipoContenedor } from "./dto";
import { TiposContenedoresServices } from "./tipos-contenedores.services";

@Controller('tipos-contenedores')
export class TiposContenedoresController {
    constructor(private readonly tiposContenedoresService: TiposContenedoresServices) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try{
            response.status = 'success';
            response.message = '';
            response.data =  await this.tiposContenedoresService.getAll()
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
            response.data =  await this.tiposContenedoresService.getById(id);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() addTipoContenedor: AddTipoContenedor, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            let security: Security = new Security();
            Object.assign(security, req.user);
            addTipoContenedor.createdBy = security.username;
            response.status = 'success';
            response.message = '';
            response.data = await this.tiposContenedoresService.insert(addTipoContenedor);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTipoContenedor: UpdateTipoContenedor, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            let security: Security = new Security();
            Object.assign(security, req.user);
            updateTipoContenedor.lastChangedBy = security.username;
            response.status = 'success';
            response.message = '';
            response.data = await this.tiposContenedoresService.update(id, updateTipoContenedor);
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
            response.data = await this.tiposContenedoresService.remove(id, security.username);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}