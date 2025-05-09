'use client';

import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const CreateCompanyPageLink = () => {
	const pathname = usePathname();

	if (pathname === ROUTES.CREATE_COMPANY) return null;

	return (
		<Button variant="card" asChild>
			<Link href={ROUTES.CREATE_COMPANY}>Створити компанію</Link>
		</Button>
	);
};
