import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from "@nestjs/common";
import { Request } from "express";
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
    async create(@Body() addLectura: AddLectura, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            const security = req.body.security;
            addLectura.createdBy = security.username;
            response.status = 'success';
            response.message = '';
            response.data = await this.lecturasService.insert(addLectura);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            const security = req.body.security;
            response.status = 'success';
            response.message = '';
            response.data = await this.lecturasService.remove(id, security.username);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}