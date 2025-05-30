export type OrderPolicy = {
	policySlug: string;
	informations: OrderField[];
	price: number;
};

export type OrderField = {
	key: string;
	value: string;
};

export type Order = {
	id: string;
	status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
	createdAt: string;
	price: number;
	policy: {
		company: {
			id: string;
			name: string;
		};
		slug: string;
		name: string;
		description: string;
		options: [];
		price: number;
		version: number;
	};
	informations: {
		key: string;
		value: string | boolean;
	}[];
};

export type OrderFilters = {
	companyId?: string;
	userId?: string | null;
};
