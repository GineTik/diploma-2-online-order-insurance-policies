'use client';

import { useParams } from 'next/navigation';
import { CompanyProfile } from '@/widgets/companies';
import { PolicyListByCategory } from '@/widgets/policies';
import { H2 } from '@/shared/ui';
import { CreatePolicyForm } from '@/features/policies';

export default function CompanyPage() {
	const params = useParams<{ id: string }>();

	if (!params?.id) {
		return <div>Company not found</div>;
	}

	return (
		<div className="space-y-4 mx-auto max-w-[800px] w-full">
			<div className="bg-surface rounded-default *:p-10 divide-y divide-surface-secondary flex-1">
				<CompanyProfile />
				<div>
					<div className="p-4 bg-background rounded-default">
						<CreatePolicyForm />
					</div>
				</div>
			</div>
			<H2>Поліси</H2>
			<PolicyListByCategory category="company" />
		</div>
	);
}
