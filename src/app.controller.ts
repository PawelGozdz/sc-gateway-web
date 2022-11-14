import { Controller, Get, Req, ConflictException } from '@nestjs/common';
// import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
	constructor() {} // private readonly appService: AppService

	@Get()
	getHello(@Req() _: Request): string {
		// @ts-ignore
		// req.user = 123;
		// return this.appService.getHello();
		throw new ConflictException(';asdfadsfsadf');
	}
}
