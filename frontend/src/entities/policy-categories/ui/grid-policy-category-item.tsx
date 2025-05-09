import { H3 } from '@/shared/ui';
import { PolicyCategory } from '../types';

type GridPolicyCategoryItemProps = {
	category: PolicyCategory;
	icon: React.ReactNode;
};

export const GridPolicyCategoryItem = ({
	category,
	icon,
}: GridPolicyCategoryItemProps) => {
	return (
		<div className="bg-surface rounded-md p-4 flex gap-4">
			<div className="rounded-md bg-background p-2">{icon}</div>
			<div>
				<H3>{category.name}</H3>
				<p className="text-sm text-foreground/80">Опис страхування</p>
			</div>
		</div>
	);
};
