import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniasController } from "src/controllers/companias.controller";
import { CompaniasServices } from "src/services/companias.services";
import { Companias } from "src/entities/companias.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Companias])],
    controllers: [CompaniasController],
    providers: [CompaniasServices],
})
export class CompaniasModule {}