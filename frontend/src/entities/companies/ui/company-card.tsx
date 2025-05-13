import { ArrowRightIcon } from 'lucide-react';
import { Company } from '../companies.types';
import { Badge, Button, Card, CardContent, CardTitle } from '@/shared/ui';
import Link from 'next/link';

type CompanyCardProps = {
	company: Company;
};

export const CompanyCard = ({ company }: CompanyCardProps) => {
	return (
		<Card className="">
			<CardContent className="flex items-center justify-between space-x-4">
				<Link href={`/companies/${company.id}`} className="hover:underline">
					<CardTitle>{company.name}</CardTitle>
				</Link>
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
