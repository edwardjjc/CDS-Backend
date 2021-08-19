import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { BaseResponse } from "src/models/response/base.response";
import { DistanciaContenedoresServices } from "../distancias-contenedores/distancias-contenedores.services";
import { Distancias } from "../distancias-contenedores/dto/distancias.response";
import { Security } from "../security/dto";
import { JwtAuthGuard } from "../security/guards/jwt.guard";
import { RutasServices } from "./rutas.services";

@Controller('rutas')
export class RutasController {
    constructor(private readonly rutasService: RutasServices,
                private readonly distanciaContenedoresService: DistanciaContenedoresServices) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllActive(): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try{
            response.status = 'success';
            response.message = '';
            response.data =  await this.rutasService.getAllActive()
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getDetail(@Param('id') id: string): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            response.status = 'success';
            response.message = '';
            response.data =  await this.rutasService.getDetail(id);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Get('history')
    async getAllHistory(): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            response.status = 'success';
            response.message = '';
            response.data =  await this.rutasService.getAllHistory();
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            let security: Security = new Security();
            Object.assign(security, req.user);
            let distancias: Distancias = await this.distanciaContenedoresService.getDistanceMatrix();
            response.status = 'success';
            response.message = '';
            response.data = await this.rutasService.create(distancias);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}