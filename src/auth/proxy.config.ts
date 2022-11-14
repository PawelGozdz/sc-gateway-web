import { Options, responseInterceptor, fixRequestBody } from 'http-proxy-middleware';
import { HandleError } from 'src/utils/error-handling';
import { SERVICE_PORT, SERVICE_NAME } from './auth.constant';

export const proxySettings: Options = {
	target: `http://${SERVICE_NAME}:${SERVICE_PORT}`, // target host
	changeOrigin: true, // needed for virtual hosted sites
	pathRewrite: {
		'^/api/v1/auth': '/api/v1/auth', // rewrite path
	},
	logLevel: 'info',
	router: {
		// '/users': 'https://jsonplaceholder.typicode.com',
	},
	// logProvider: '',
	selfHandleResponse: true,
	onProxyReq: fixRequestBody,
	onProxyRes: responseInterceptor(async (buffer, proxyRes, _, res): Promise<any> => {
		try {
			const responseFromService = buffer.toString('utf8');

			res.setHeader('content-type', 'application/json; charset=utf-8');

			if (proxyRes['statusCode'] && proxyRes.statusCode >= 400) {
				const respObj = HandleError(JSON.parse(responseFromService), res);
				return JSON.stringify(respObj);
			}

			return responseFromService;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}),
};
