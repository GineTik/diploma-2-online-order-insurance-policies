import { PolicyList, PolicyFiltration } from '@/widgets/policies';

export default function Page({ params }: { params: { category: string } }) {
	return (
		<div className="space-y-2 max-w-[800px] mx-auto w-full">
			<PolicyFiltration />
			<PolicyList category={params.category} />
		</div>
	);
}
