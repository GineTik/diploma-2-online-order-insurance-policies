import { PolicyCategoryField } from '@/entities/policy-categories';

export * from './ui/order-form';
export * from './ui/order-form-inputs';
export * from './ui/order-action';

export type PolicyFormFieldWithNameValue = PolicyCategoryField & {
	name: string;
	value: string;
};
