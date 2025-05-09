import { ArrowRightIcon } from 'lucide-react';
import { Company } from '../types';
import { Badge, Button, H3 } from '@/shared/ui';
import Link from 'next/link';

type CompanyListItemProps = {
	company: Company;
};

export const CompanyListItem = ({ company }: CompanyListItemProps) => {
	return (
		<div className="flex items-center bg-surface p-4 rounded-default space-x-4">
			<H3>{company.name}</H3>
			<Badge variant="secondary">20 страхових полісів</Badge>
			<Button className="ml-auto" variant="outline" size="sm" asChild>
				<Link href={`/companies/${company.id}`}>
					Детальніше
					<ArrowRightIcon className="w-4 h-4" />
				</Link>
			</Button>
		</div>
	);
};
