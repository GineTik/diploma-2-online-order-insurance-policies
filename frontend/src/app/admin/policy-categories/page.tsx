import { CreatePolicyCategoryForm } from '@/features/policy-categories';
import { PolicyCategoriesList } from '@/widgets/policy-categories';

export default function PolicyCategoriesPage() {
	return (
		<div className="flex gap-4 max-w-[1000px] mx-auto w-full flex-col-reverse md:flex-row">
			<div className="flex-1">
				<PolicyCategoriesList />
			</div>
			<CreatePolicyCategoryForm />
		</div>
	);
}
