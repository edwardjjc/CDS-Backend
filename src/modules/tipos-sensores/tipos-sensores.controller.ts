import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BaseResponse } from "src/models/response/base.response";
import { AddTipoSensor, UpdateTipoSensor } from "./dto";
import { TiposSensoresServices } from "./tipos-sensores.services";

@Controller('tipos-sensores')
export class TiposSensoresController {
    constructor(private readonly tiposSensoresService: TiposSensoresServices) {}

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

    @Post()
    async create(@Body() addTipoSensor: AddTipoSensor): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            response.status = 'success';
            response.message = '';
            response.data = await this.tiposSensoresService.insert(addTipoSensor);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTipoSensor: UpdateTipoSensor): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            response.status = 'success';
            response.message = '';
            response.data = this.tiposSensoresService.update(id, updateTipoSensor);
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
            response.data = this.tiposSensoresService.remove(id)
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}