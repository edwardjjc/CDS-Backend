import { Injectable } from '@nestjs/common';
import { Contenedores } from 'src/entities/contenedores.entity';
import { getConnectionManager, Repository } from 'typeorm';
import { ConnectionManager } from './connection-manager.service';

@Injectable()
export class AppService {
  private repo: Repository<Contenedores>;

  constructor() {
    ConnectionManager.getInstance().then(() => {
      const cnnManager = getConnectionManager().get();
      this.repo = cnnManager.getRepository(Contenedores);
    });
  }

  public async getAll(): Promise<Contenedores[]> {
    try {
      return this.repo.find();
    } catch (error) {
      console.log('Ocurrio un error al obtener los contenedores' + error);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
