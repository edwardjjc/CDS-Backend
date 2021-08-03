import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from "@nestjs/common";
import { Request } from "express";
import { AddCompania, UpdateCompania } from "src/modules/companias/dto";
import { BaseResponse } from "src/models/response/base.response";
import { CompaniasServices } from "src/modules/companias/companias.services";

@Controller('compania')
export class CompaniasController {
    constructor(private readonly companiaService: CompaniasServices) {}

    @Get('test')
    async test(@Query() query){
        console.log(`No Serie recibido ${query.noSerie} y Lectura recibida ${query.lectura}`)
        return 'OK';
    }

    @Get()
    async getAll(): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try{
            response.status = 'success';
            response.message = '';
            response.data =  await this.companiaService.getAll()
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
            response.data =  await this.companiaService.getById(id);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @Post()
    async create(@Body() addCompania: AddCompania, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            let security = req.body.security;
            addCompania.createdBy = security.username;
            response.status = 'success';
            response.message = '';
            response.data = await this.companiaService.insert(addCompania)
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCompania: UpdateCompania, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            let security = req.body.security;
            updateCompania.lastChangedBy = security.username;
            response.status = 'success';
            response.message = '';
            response.data = await this.companiaService.update(id, updateCompania);
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
            response.data = await this.companiaService.remove(id, security.username);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}