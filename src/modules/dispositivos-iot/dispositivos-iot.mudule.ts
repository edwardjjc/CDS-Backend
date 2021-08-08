import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispositivosIoT } from "src/entities";
import { SecurityModule } from "../security/security.module";
import { JwtStrategy } from "../security/strategies/jwt.strategy";
import { DispositivosIoTController } from "./dispositivos-iot.controller";
import { DispositivosIoTServices } from "./dispositivos-iot.services";

@Module({
    imports: [TypeOrmModule.forFeature([DispositivosIoT]), SecurityModule],
    controllers: [DispositivosIoTController],
    providers: [DispositivosIoTServices, JwtStrategy],
})
export class DispositivosIoTModule {}