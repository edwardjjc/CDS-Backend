import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor() {
    
  }

  public async getAll(): Promise<any> {
    try {
    } catch (error) {
      console.log('Ocurrio un error al obtener los contenedores' + error);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }

  test(): string {
    return 'Hello World!';
  }
}
