'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, H2 } from '@/shared/ui';
import { CreatePolicyForm } from '@/features/policies';
import { CompanyProfile } from '@/widgets/company-profile';
import { PolicyList } from '@/widgets/policy-list';

export default function CompanyPage() {
	const params = useParams<{ id: string }>();

	if (!params?.id) {
		return <div>Company not found</div>;
	}

	return (
		<div className="space-y-4 mx-auto max-w-[800px] w-full">
			<Card className="p-0">
				<CardContent className="*:px-10 *:py-6 divide-y divide-accent flex-1">
					<div className="">
						<CompanyProfile />
					</div>
					<div>
						<div className="p-4 bg-background rounded-lg">
							<CreatePolicyForm />
						</div>
					</div>
				</CardContent>
			</Card>
			<H2>Поліси</H2>
			<PolicyList
				filters={{ companyId: params.id }}
				notFoundMessage={`Не знайдено полісів цієї компанії`}
			/>
		</div>
	);
}
