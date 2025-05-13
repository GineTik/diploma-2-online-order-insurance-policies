'use client';

import { useCompany } from '@/entities/companies';
import { H2 } from '@/shared/ui';
import { useParams } from 'next/navigation';

export const CompanyProfile = () => {
	const params = useParams<{ id: string }>();

	if (!params?.id) {
		return <div>Company not found</div>;
	}

	const { company, isCompanyLoading } = useCompany(params.id);

	if (isCompanyLoading) {
		return <div>Loading...</div>;
	}

	if (company == null) {
		return <div>Company not found</div>;
	}

	return (
		<div className="">
			<H2>{company?.name}</H2>
			{company?.description ? (
				<p>{company?.description}</p>
			) : (
				<p className="text-muted-foreground">Немає опису</p>
			)}
		</div>
	);
};
