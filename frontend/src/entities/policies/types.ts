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
