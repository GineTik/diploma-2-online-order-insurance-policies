'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, H2 } from '@/shared/ui';
import { CompanyProfile } from '@/widgets/company-profile';
import { PolicyList } from '@/widgets/policy-list';
import { CreatePolicyForm } from '@/features/policies';
import { useCompany } from '@/entities/companies';
import { useAuth } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

export default function CompanyPage() {
	const params = useParams<{ id: string }>();
	const { company, isCompanyLoading } = useCompany(params.id);
	const { userId } = useAuth();

	if (!params?.id || !company) {
		return <div className="pt-5 text-center">Company not found</div>;
	}

	if (isCompanyLoading) {
		return <Loader2 className="size-5 mx-auto animate-spin" />;
	}

	return (
		<div className="space-y-4 mx-auto max-w-[800px] w-full">
			<Card className="p-0">
				<CardContent className="*:px-2 md:*:px-10 *:py-6 divide-y divide-accent flex-1">
					<CompanyProfile />
					{company?.admin?.sub === userId && (
						<div>
							<div className="p-4 bg-background rounded-lg">
								<CreatePolicyForm />
							</div>
						</div>
					)}
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
