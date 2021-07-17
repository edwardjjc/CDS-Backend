import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { BaseResponse } from "src/models/response/base.response";
import { LecturasServices } from "./lecturas.services";
import { AddLectura } from "./dto";

@Controller('lecturas')
export class LecturasController {
    constructor(private readonly lecturasService: LecturasServices) {}

    @Get()
    async getAll(): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try{
            response.status = 'success';
            response.message = '';
            response.data =  await this.lecturasService.getAll()
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
            response.data =  await this.lecturasService.getById(id);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @Post()
    async create(@Body() addLectura: AddLectura): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            response.status = 'success';
            response.message = '';
            response.data = await this.lecturasService.insert(addLectura)
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
            response.data = this.lecturasService.remove(id)
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}