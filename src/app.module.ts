import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/app.config';
import { CompaniasModule, ContenedoresModule, DispositivosIoTModule, LecturasModule, 
  SecurityModule, TiposCamionesModule, TiposContenedoresModule, TiposSensoresModule, 
  UsuariosModule } from './modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()), 
    CompaniasModule, 
    ContenedoresModule,
    DispositivosIoTModule,
    SecurityModule,
    TiposCamionesModule, 
    TiposContenedoresModule,
    TiposSensoresModule,
    LecturasModule,
    UsuariosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
