import { H3 } from '@/shared/ui/headings';
import { Policy } from '../types';
import { Button } from '@/shared/ui/button';
import { HandCoinsIcon, CheckIcon } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';

type PolicyListItemProps = {
	policy: Policy;
};

export const PolicyListItem = ({ policy }: PolicyListItemProps) => {
	return (
		<div className="border border-border rounded-default overflow-hidden bg-surface divide-y divide-border">
			<div className="flex gap-2 p-5">
				<div className="">
					<div className="">
						<Link href={ROUTES.POLICY(policy.slug)} className="hover:underline">
							<H3>{policy.name}</H3>
						</Link>
						<p className="text-sm text-muted-foreground">
							{policy.description}
						</p>
					</div>
					<ul className="space-y-1 list-none mt-2">
						{policy.options.map((option) => (
							<li key={option} className="flex items-center gap-2 text-sm">
								<CheckIcon className="size-4 text-emerald-500" />
								{option}
							</li>
						))}
					</ul>
				</div>
				<div className="ml-auto">
					<Button variant="accent" asChild>
						<Link href={ROUTES.POLICY(policy.slug)}>
							<HandCoinsIcon className="size-4 font-semibold" />
							Купити онлайн
						</Link>
					</Button>
					<p className="text-sm font-bold mt-1">Ціна: {policy.price} ₴</p>
				</div>
			</div>
			<div className="p-5">
				<p className="text-sm text-muted-foreground">Компанія: ...</p>
			</div>
		</div>
	);
};
