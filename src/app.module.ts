import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WebHttpExceptionFilter } from './interceptors';

import { AppLoggerMiddleware } from './middlewares';

@Module({
	imports: [AuthModule],
	controllers: [AppController],
	providers: [AppService, WebHttpExceptionFilter],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AppLoggerMiddleware).forRoutes('*');
	}
}
