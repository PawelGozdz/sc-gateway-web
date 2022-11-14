import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { WebHttpExceptionFilter } from 'src/interceptors';
import { proxySettings as authProxySettings } from './proxy.config';

@Module({
	controllers: [],
	providers: [WebHttpExceptionFilter],
})
export class AuthModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(createProxyMiddleware('/api/**/auth/**', authProxySettings)).forRoutes('*');
	}
}
