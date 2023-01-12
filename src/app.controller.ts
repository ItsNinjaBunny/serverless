import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('hello/:id')
  getHello(
    @Param('id')
    id: string
  ): string {
    return this.appService.getHello(id);
  }

  @HttpCode(200)
  @Post('post')
  getPost(
    @Body()
    body: any
  ) {
    return body;
  }

}
