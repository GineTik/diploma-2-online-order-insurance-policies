import { ArrowRightIcon } from 'lucide-react';
import { Company } from '../types';
import { Badge, Button, H3 } from '@/shared/ui';
import Link from 'next/link';
import { Card, CardContent } from '@/shared/ui/card';

type CompanyCardProps = {
	company: Company;
};

export const CompanyCard = ({ company }: CompanyCardProps) => {
	return (
		<Card className="">
			<CardContent className="flex items-center justify-between space-x-4">
				<H3>{company.name}</H3>
				<Badge variant="secondary">20 страхових полісів</Badge>
				<Button className="ml-auto" variant="outline" size="sm" asChild>
					<Link href={`/companies/${company.id}`}>
						Детальніше
						<ArrowRightIcon className="w-4 h-4" />
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
};
