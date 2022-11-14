import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
	private logger = new Logger('HTTP');

	use(request: Request, response: Response, next: NextFunction): void {
		const { ip, method, body, originalUrl } = request;
		const userAgent = request.get('user-agent') || '';
		const jsonBody = JSON.stringify(body);

		response.on('close', () => {
			const { statusCode } = response;
			const contentLength = response.get('content-length');

			this.logger.log(
				`[${new Date().toISOString()}] - ${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} ${
					body ? 'BODY ' + jsonBody : ''
				}`,
			);
		});

		next();
	}
}
