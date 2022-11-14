import { Response } from 'express';

const errorCode = (code: number) => {
	switch (code) {
		case 400:
			return 'Bad Request';
		case 401:
			return 'Unouthorized';
		case 403:
			return 'Not Allowed';
		case 404:
			return 'Not Found';
		case 405:
			return 'Method Not Allowed';
		case 409:
			return 'Conflict';
		case 422:
			return 'Unprocessable Entity';
		default:
			return 'Other Error';
	}
};

export const responseBody = (response: Response, messages: string[], stack?: any) => {
	return {
		statusCode: response.statusCode || 500,
		messages: messages,
		error: errorCode(response.statusCode || 500),
		stack,
	};
};

export const HandleError = (respBody: any, res: Response | any, stack?: any) => {
	const errArray: string[] = [];

	if (respBody?.messages && respBody['messages']?.length > 0) {
		errArray.push(...respBody['messages']);
	} else {
		let err = respBody?.message || respBody?.msg || 'Unknown error occured';
		err = Array.isArray(err) ? err : [err];
		errArray.push(...err);
	}

	return responseBody(res, errArray, stack);
};
