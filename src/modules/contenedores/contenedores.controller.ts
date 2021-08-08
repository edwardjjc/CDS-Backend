import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { BaseResponse } from "src/models/response/base.response";
import { DistanciaContenedoresServices } from "../distancias-contenedores/distancias-contenedores.services";
import { JwtAuthGuard } from "../security/guards/jwt.guard";
import { ContenedoresServices } from "./contenedores.services";
import { AddContenedor, UpdateContenedor } from "./dto";

@Controller('contenedores')
export class ContenedoresController {
    constructor(private readonly contenedoresService: ContenedoresServices,
                private readonly distanciaContenedoresService: DistanciaContenedoresServices) {}


    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try{
            response.status = 'success';
            response.message = '';
            response.data =  await this.contenedoresService.getAll()
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
            response.data =  await this.contenedoresService.getById(id);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Post('fill-distances')
    async fillDistances(): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse();
        try {
            await this.distanciaContenedoresService.removeAll();
            await this.distanciaContenedoresService.fill();
            response.status = 'success';
            response.message = '';
            response.data = await this.distanciaContenedoresService.getDistanceMatrix();
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() addContenedor: AddContenedor, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            const security = req.body.security;
            addContenedor.createdBy = security.username;
            response.status = 'success';
            response.message = '';
            response.data = await this.contenedoresService.insert(addContenedor)
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateContenedor: UpdateContenedor, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            const security = req.body.security;
            updateContenedor.lastChangedBy = security.username;
            response.status = 'success';
            response.message = '';
            response.data = await this.contenedoresService.update(id, updateContenedor);
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
            const security = req.body.security;
            response.status = 'success';
            response.message = '';
            response.data = await this.contenedoresService.remove(id, security.username);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}