import { PolicyFiltration } from '@/features/policies';
import { PolicyListByCategory } from '@/widgets/policy-list';

export default function Page({ params }: { params: { category: string } }) {
	return (
		<div className="space-y-2 max-w-[800px] mx-auto w-full">
			<PolicyFiltration />
			<PolicyListByCategory category={params.category} />
		</div>
	);
}
