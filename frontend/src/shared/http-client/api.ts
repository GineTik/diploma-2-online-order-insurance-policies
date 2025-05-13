import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';

export const api = axios.create({
	baseURL: 'http://localhost:3001',
});

api.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: any) => {
		toast.error(error.response.data.message);
		return Promise.reject(error);
	},
);
