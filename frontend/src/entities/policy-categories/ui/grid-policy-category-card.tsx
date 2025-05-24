import { H3 } from '@/shared/ui';
import { PolicyCategory } from '../categories.types';
import { Card, CardContent } from '@/shared/ui/card';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';

type GridPolicyCategoryCardProps = {
	category: PolicyCategory;
	icon: React.ReactNode;
};

export const GridPolicyCategoryCard = ({
	category,
	icon,
}: GridPolicyCategoryCardProps) => {
	return (
		<Link href={ROUTES.POLICY_LIST(category.slug)}>
			<Card className="rounded-xl hover:scale-[103%] transition-all duration-300 h-full">
				<CardContent className="flex gap-4 items-center h-full">
					<div className="rounded-md bg-background p-2">{icon}</div>
					<div>
						<H3 className="leading-tight">{category.name}</H3>
						<p className="text-sm text-foreground/80">{category.description}</p>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};
