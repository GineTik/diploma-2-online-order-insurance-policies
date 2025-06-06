import { H2, Button, Badge } from '@/shared/ui';
import { PolicyCategory } from '../categories.types';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn, getPolicyWord } from '@/shared/lib/utils';
import { ROUTES } from '@/shared/constants/routes';

type AccentPolicyCategoryCardProps = {
	category: PolicyCategory;
	className?: string;
};

export const AccentPolicyCategoryCard = ({
	category,
	className,
}: AccentPolicyCategoryCardProps) => {
	return (
		<Link
			className={cn(
				'p-5 flex flex-col gap-2 h-[300px] hover:scale-[102%] transition-all duration-300 rounded-xl',
				className,
			)}
			href={ROUTES.POLICY_LIST(category.slug)}
		>
			<H2>{category.name}</H2>
			<Badge variant="card">
				{category.policiesCount} {getPolicyWord(category.policiesCount)}
			</Badge>
			<Button className="mt-auto" variant="card" size="icon">
				<ChevronRight className="size-6" />
			</Button>
		</Link>
	);
};
