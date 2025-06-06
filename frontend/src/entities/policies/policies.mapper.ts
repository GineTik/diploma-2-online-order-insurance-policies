import { CreatePolicy, Policy, UpdatePolicy } from './policies.types';

export const mapFromPolicySchemaToCreateRequest = (policy: CreatePolicy) => {
	return {
		name: policy.name,
		description: policy.description,
		price: Number(policy.price),
		categoryId: policy.categoryId,
		slug: policy.slug,
		options: policy.options,
	} as Policy;
};

export const mapFromPolicySchemaToUpdateRequest = (policy: UpdatePolicy) => {
	return mapFromPolicySchemaToCreateRequest(policy);
};
