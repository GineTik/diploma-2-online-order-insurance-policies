import { CreatePolicy, Policy } from './policies.types';

export const mapFromPolicySchemaToRequest = (policy: CreatePolicy) => {
	return {
		name: policy.name,
		description: policy.description,
		price: Number(policy.price),
		categoryId: policy.categoryId,
		slug: policy.slug,
	} as Policy;
};
