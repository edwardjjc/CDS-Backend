import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispositivosIoT } from "src/entities";
import { DispositivosIoTController } from "./dispositivos-iot.controller";
import { DispositivosIoTServices } from "./dispositivos-iot.services";

@Module({
    imports: [TypeOrmModule.forFeature([DispositivosIoT])],
    controllers: [DispositivosIoTController],
    providers: [DispositivosIoTServices],
})
export class DispositivosIoTModule {}