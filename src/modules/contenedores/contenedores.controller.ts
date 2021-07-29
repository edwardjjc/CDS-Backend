import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { BaseResponse } from "src/models/response/base.response";
import { DistanciaContenedoresServices } from "../distancias-contenedores/distancias-contenedores.services";
import { ContenedoresServices } from "./contenedores.services";
import { AddContenedor, UpdateContenedor } from "./dto";

@Controller('contenedores')
export class ContenedoresController {
    constructor(private readonly contenedoresService: ContenedoresServices,
                private readonly distanciaContenedoresService: DistanciaContenedoresServices) {}

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

    @Post()
    async create(@Body() addContenedor: AddContenedor): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            response.status = 'success';
            response.message = '';
            response.data = await this.contenedoresService.insert(addContenedor)
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateContenedor: UpdateContenedor): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            response.status = 'success';
            response.message = '';
            response.data = this.contenedoresService.update(id, updateContenedor);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            response.status = 'success';
            response.message = '';
            response.data = this.contenedoresService.remove(id)
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}