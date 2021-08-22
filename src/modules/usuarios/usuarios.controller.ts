import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { BaseResponse } from "src/models/response/base.response";
import { Security } from "../security/dto";
import { JwtAuthGuard } from "../security/guards/jwt.guard";
import { AddUsuario } from "./dto";
import { UsuariosServices } from "./usuarios.services";

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosServices) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try{
            response.status = 'success';
            response.message = '';
            response.data =  await this.usuariosService.getAll()
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Get('perfiles')
    async getPerfiles(): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try{
            response.status = 'success';
            response.message = '';
            response.data =  await this.usuariosService.getPerfiles()
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
            response.data =  await this.usuariosService.getById(id);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() addUsuario: AddUsuario, @Req() req: Request): Promise<BaseResponse> {
        let response: BaseResponse = new BaseResponse;
        try {
            let security: Security = new Security();
            Object.assign(security, req.user);
            addUsuario.createdBy = security.username;
            response.status = 'success';
            response.message = '';
            response.data = await this.usuariosService.insert(addUsuario);
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
            response.data = await this.usuariosService.remove(id, security.username);
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
        }
        return response;
    }
}