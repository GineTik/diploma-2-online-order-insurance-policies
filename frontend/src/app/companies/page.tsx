import { H2 } from '@/shared/ui';
import { CompanyList } from '@/widgets/companies';

export default function Page() {
	return (
		<div className="p-4 space-y-4 max-w-[800px] mx-auto">
			<H2>Усі компанії</H2>
			<CompanyList />
		</div>
	);
}
