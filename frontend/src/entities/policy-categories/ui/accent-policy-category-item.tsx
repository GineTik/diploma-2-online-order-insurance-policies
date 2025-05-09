import { H2, Button, Badge } from '@/shared/ui';
import { PolicyCategory } from '../types';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { ROUTES } from '@/shared/constants/routes';

type AccentPolicyCategoryItemProps = {
	category: PolicyCategory;
	badge: string;
	className?: string;
};

export const AccentPolicyCategoryItem = ({
	category,
	badge,
	className,
}: AccentPolicyCategoryItemProps) => {
	return (
		<Link
			className={cn(
				'p-5 rounded-lg flex flex-col gap-2 h-[300px] hover:scale-[102%] transition-all duration-300',
				className,
			)}
			href={ROUTES.POLICY_LIST(category.slug)}
		>
			<H2>{category.name}</H2>
			<Badge variant="card">{badge}</Badge>
			<Button className="mt-auto" variant="card" size="icon">
				<ChevronRight className="size-6" />
			</Button>
		</Link>
	);
};
