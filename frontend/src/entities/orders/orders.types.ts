export type OrderPolicy = {
	policySlug: string;
	information: OrderField[];
};

export type OrderField = {
	key: string;
	value: string;
};

export type Order = {
	id: string;
	status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
	createdAt: string;
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
};
