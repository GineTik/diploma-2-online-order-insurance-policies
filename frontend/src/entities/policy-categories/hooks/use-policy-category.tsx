import { PolicyCategory } from '../categories.types';

export const usePolicyCategory = () => {
	return {
		category: {
			name: 'Автогражданка',
			slug: 'auto-insurance',
			description: 'Автогражданка',
			fields: [
				{
					name: 'car-type',
					label: 'Тип авто',
					placeholder: 'Тип авто',
					type: 'select',
					values: [
						{
							label: 'Легковий',
							value: 'car',
						},
						{
							label: 'Мотоцикл',
							value: 'motorcycle',
						},
						{
							label: 'Транспортні засоби спеціального призначення',
							value: 'special-transport',
						},
					],
				},
				{
					name: 'car-engine-volume',
					label: "Об'єм двигуна",
					placeholder: "Об'єм двигуна",
					type: 'string',
				},
				{
					name: 'car-address',
					label: 'Адреса за тех паспортом',
					placeholder: 'Адреса за тех паспортом',
					type: 'string',
				},
				{
					name: 'car-privileges',
					label: 'Пільги',
					placeholder: 'Пільги',
					type: 'string',
				},
				{
					name: 'car-number',
					label: 'Номер вашого авто',
					placeholder: 'АК 9265 АК',
					type: 'string',
				},
			],
		} as PolicyCategory,
	};
};
