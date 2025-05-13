export type PolicyCategory = {
	id: string;
	name: string;
	slug: string;
	description: string;
	fields: PolicyCategoryField[];
};

export type PolicyCategoryField = {
	name: string;
	label: string;
	placeholder: string;
	type: 'string' | 'text' | 'select';
	values?: {
		label: string;
		value: string;
	}[];
};
