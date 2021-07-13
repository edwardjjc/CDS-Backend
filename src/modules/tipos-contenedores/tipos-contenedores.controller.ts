import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BaseResponse } from "src/models/response/base.response";
import { AddTipoContenedor, UpdateTipoContenedor } from "./dto";
import { TiposContenedoresServices } from "./tipos-contenedores.services";

@Controller('tipos-contenedores')
export class TiposContenedoresController {
    constructor(private readonly tiposContenedoresService: TiposContenedoresServices) {}

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

    @Post()
    async create(@Body() addTipoContenedor: AddTipoContenedor): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            response.status = 'success';
            response.message = '';
            response.data = await this.tiposContenedoresService.insert(addTipoContenedor);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTipoContenedor: UpdateTipoContenedor): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            response.status = 'success';
            response.message = '';
            response.data = this.tiposContenedoresService.update(id, updateTipoContenedor);
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
            response.data = this.tiposContenedoresService.remove(id)
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}