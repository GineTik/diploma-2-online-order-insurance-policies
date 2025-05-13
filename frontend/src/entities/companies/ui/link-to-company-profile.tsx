import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { useUserCompany } from '../hooks/use-user-company';
import { ROUTES } from '@/shared/constants/routes';

export const LinkToCompanyProfile = () => {
	const { company } = useUserCompany();

	return (
		<Button variant="card" asChild>
			<Link href={ROUTES.COMPANY_PROFILE(company.id)}>{company.name}</Link>
		</Button>
	);
};
