import { H3 } from '@/shared/ui';
import { PolicyCategory } from '../types';
import { Card, CardContent } from '@/shared/ui/card';

type GridPolicyCategoryCardProps = {
	category: PolicyCategory;
	icon: React.ReactNode;
};

export const GridPolicyCategoryCard = ({
	category,
	icon,
}: GridPolicyCategoryCardProps) => {
	return (
		<Card className="">
			<CardContent className="flex gap-4 items-center">
				<div className="rounded-md bg-background p-2">{icon}</div>
				<div>
					<H3 className="leading-tight">{category.name}</H3>
					<p className="text-sm text-foreground/80">Опис страхування</p>
				</div>
			</CardContent>
		</Card>
	);
};
