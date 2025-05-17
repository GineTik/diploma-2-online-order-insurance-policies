import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error) => {
		if (error.response.status >= 500) {
			toast.error(error.response.data.message);
		}
		return Promise.reject(error);
	},
);
