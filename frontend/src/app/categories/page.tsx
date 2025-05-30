import { CreatePolicyCategoryForm } from '@/features/policy-categories';
import { H2 } from '@/shared/ui';
import { PolicyCategoryList } from '@/widgets/policy-category-list';
import { PERMISSIONS, UnderPermission } from '@/shared/auth';

export default function PolicyCategoriesPage() {
	return (
		<div className="flex items-start gap-4 max-w-[1000px] mx-auto w-full flex-col-reverse md:flex-row">
			<div className="flex-1 space-y-4">
				<H2>Усі категорії</H2>
				<PolicyCategoryList />
			</div>
			<UnderPermission permission={PERMISSIONS.MANAGE_POLICY_CATEGORIES}>
				<CreatePolicyCategoryForm />
			</UnderPermission>
		</div>
	);
}
