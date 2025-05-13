import { Card, CardTitle, CardDescription, CardHeader } from '@/shared/ui';
import { PolicyCategory } from '../categories.types';

type RowPolicyCategoryCardProps = {
	category: PolicyCategory;
};

export const RowPolicyCategoryCard = ({
	category,
}: RowPolicyCategoryCardProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{category.name}</CardTitle>
				<CardDescription>
					{category.description ?? 'Немає опису'}
				</CardDescription>
			</CardHeader>
		</Card>
	);
};
