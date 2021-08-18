import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { BaseResponse } from "src/models/response/base.response";
import { Security } from "../security/dto";
import { JwtAuthGuard } from "../security/guards/jwt.guard";
import { DispositivosIoTServices } from "./dispositivos-iot.services";
import { AddDispositivoIoT, UpdateDispositivoIoT } from "./dto";

@Controller('dispositivos-iot')
export class DispositivosIoTController {
    constructor(private readonly dispositivosIoTService: DispositivosIoTServices) {}

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() addDispositivoIoT: AddDispositivoIoT, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            let security: Security = new Security();
            Object.assign(security, req.user);
            addDispositivoIoT.createdBy = security.username;
            response.status = 'success';
            response.message = '';
            response.data = await this.dispositivosIoTService.insert(addDispositivoIoT);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDispositivoIoT: UpdateDispositivoIoT, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            let security: Security = new Security();
            Object.assign(security, req.user);
            updateDispositivoIoT.lastChangedBy = security.username;
            response.status = 'success';
            response.message = '';
            response.data = await this.dispositivosIoTService.update(id, updateDispositivoIoT);
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
            response.data = await this.dispositivosIoTService.remove(id, security.username);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}