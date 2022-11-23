import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebHttpExceptionFilter } from './interceptors';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.use(helmet());
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	);

	app.useGlobalFilters(new WebHttpExceptionFilter());
	// app.set('trust proxy', 1);
	// app.connectMicroservice({
	// 	transport: Transport.TCP,
	// 	options: {
	// 		host: 'localhost',
	// 		port: 4000,
	// 	},
	// });

	// console.log(process.env.PORT);
	// await app.startAllMicroservices();
	const PORT = process.env.PORT as unknown as number;
	await app.listen(PORT, () => console.log(`PORT ${PORT}`));
	console.log('Auth microservice running');
}
bootstrap();
