import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HandleError } from 'src/utils/error-handling';

@Catch()
export class WebHttpExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		const stack = process.env.NODE_ENV === 'development' ? exception.stack : undefined;

		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

		return response.status(status).json(HandleError(exception, response, stack));
	}
}
