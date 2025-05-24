import { usePolicyCategories } from './use-policy-categories';

export const usePolicyCategory = (categoryId: string) => {
	const { categories, isCategoriesLoading } = usePolicyCategories();

	const category = categories?.find((category) => category.id === categoryId);

	return {
		category,
		isLoadingCategory: isCategoriesLoading,
	};
};
