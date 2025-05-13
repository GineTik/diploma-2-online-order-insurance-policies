export type Policy = {
	id: string;
	name: string;
	description: string;
	price: number;
	options: string[];
	slug: string;
	version: number;
	createdAt: Date;
	updatedAt: Date;
	categoryId: string;
};

export type CreatePolicy = {
	name: string;
	slug: string;
	description: string;
	price: number;
	categoryId: string;
};
