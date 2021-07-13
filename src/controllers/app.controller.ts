import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('test')
  test(@Query() query): string {
    console.log("Lid is open?: ", query.isOpen);
    console.log("Module: ", query.moduleId);
    return "Success";
  }
}
