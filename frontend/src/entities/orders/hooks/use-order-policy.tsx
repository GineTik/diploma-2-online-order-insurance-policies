'use client';

import { useMutation } from '@tanstack/react-query';
import { orderPolicy } from '../orders.services';
import { useAuth } from '@clerk/nextjs';
import { OrderPolicy } from '../orders.types';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useState } from 'react';

type FormFieldError = { type: string; message: string };
type ParsedFormErrors = Record<string, FormFieldError> | null;

export const useOrderPolicy = () => {
	const { getToken } = useAuth();
	const router = useRouter();
	const [parsedOrderErrors, setParsedOrderErrors] =
		useState<ParsedFormErrors>(null);

	const { mutateAsync, isPending, error } = useMutation({
		mutationKey: ['order-policy'],
		mutationFn: async (orderData: OrderPolicy) => {
			setParsedOrderErrors(null); // Clear previous errors
			return orderPolicy(orderData, await getToken());
		},
		onSuccess: (_, variables) => {
			setParsedOrderErrors(null); // Clear errors on success
			router.push(ROUTES.SUCCESS_ORDER(variables.policySlug));
		},
		onError: (axiosError: AxiosError<{ message: string[] | string }>) => {
			const apiResponse = axiosError.response?.data;
			const messages = apiResponse?.message;
			const fieldSpecificErrors: Record<string, FormFieldError> = {};
			let unparsedMessages: string[] = [];
			let hasFieldSpecificErrors = false;

			if (Array.isArray(messages)) {
				messages.forEach((msg) => {
					const messageStr = String(msg);
					const match = messageStr.match(/^(informations\.\d+\.\w+)\s+(.*)$/);
					if (match) {
						const fieldName = match[1];
						const errorMessage = match[2];
						fieldSpecificErrors[fieldName] = {
							type: 'manual',
							message: errorMessage,
						};
						hasFieldSpecificErrors = true;
					} else {
						unparsedMessages.push(messageStr);
					}
				});
			} else {
				unparsedMessages.push('Щось пішло не так');
			}

			if (hasFieldSpecificErrors) {
				setParsedOrderErrors(fieldSpecificErrors);
				if (unparsedMessages.length > 0) {
					console.warn('Unparsed error parts:', unparsedMessages.join('; '));
					// Optionally, show a less prominent toast for these parts
					toast.info(`Є додаткові системні повідомлення. Деталі в консолі.`);
				}
			} else if (unparsedMessages.length > 0) {
				const combinedMessage = unparsedMessages.join(', ');
				setParsedOrderErrors({
					'root.serverError': { type: 'manual', message: combinedMessage },
				});
				toast.error(combinedMessage);
			} else {
				// Fallback for truly empty/unhandled error states
				const defaultMessage = 'Не вдалося обробити помилку сервера.';
				setParsedOrderErrors({
					'root.serverError': { type: 'manual', message: defaultMessage },
				});
				toast.error(defaultMessage);
			}
		},
	});

	return {
		order: mutateAsync,
		isOrderLoading: isPending,
		parsedOrderErrors, // Provide parsed errors
		rawOrderError: error, // Provide raw error as well
	};
};
