import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/app.config';
import { CamionesModule, CompaniasModule, ConfiguracionesModule, ContenedoresModule, 
  DispositivosIoTModule, LecturasModule, RutasModule, SecurityModule, TiposCamionesModule, 
  TiposContenedoresModule, TiposSensoresModule, UsuariosModule } from './modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()), 
    CamionesModule,
    CompaniasModule,
    ConfiguracionesModule, 
    ContenedoresModule,
    DispositivosIoTModule,
    LecturasModule,
    RutasModule,
    SecurityModule,
    TiposCamionesModule, 
    TiposContenedoresModule,
    TiposSensoresModule,
    UsuariosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
