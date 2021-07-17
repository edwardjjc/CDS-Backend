import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { BaseResponse } from "src/models/response/base.response";
import { DispositivosIoTServices } from "./dispositivos-iot.services";
import { AddDispositivoIoT, UpdateDispositivoIoT } from "./dto";

@Controller('dispositivos-iot')
export class DispositivosIoTController {
    constructor(private readonly dispositivosIoTService: DispositivosIoTServices) {}

    @Get()
    async getAll(): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try{
            response.status = 'success';
            response.message = '';
            response.data =  await this.dispositivosIoTService.getAll()
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
            response.data =  await this.dispositivosIoTService.getById(id);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @Post()
    async create(@Body() addDispositivoIoT: AddDispositivoIoT): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            response.status = 'success';
            response.message = '';
            response.data = await this.dispositivosIoTService.insert(addDispositivoIoT)
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDispositivoIoT: UpdateDispositivoIoT): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            response.status = 'success';
            response.message = '';
            response.data = this.dispositivosIoTService.update(id, updateDispositivoIoT);
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
            response.data = this.dispositivosIoTService.remove(id)
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}