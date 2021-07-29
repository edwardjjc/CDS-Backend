import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/app.config';
import { CompaniasModule, ContenedoresModule, DispositivosIoTModule, LecturasModule, 
  TiposCamionesModule, TiposContenedoresModule, TiposSensoresModule } from './modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()), 
    CompaniasModule, 
    TiposCamionesModule, 
    TiposContenedoresModule,
    TiposSensoresModule,
    ContenedoresModule,
    DispositivosIoTModule,
    LecturasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
