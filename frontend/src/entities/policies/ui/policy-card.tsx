import { H3 } from '@/shared/ui/headings';
import { Policy } from '../policies.types';
import { Button } from '@/shared/ui/button';
import { HandCoinsIcon, CheckIcon } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/shared/ui/card';

type PolicyCardProps = {
	policy: Policy;
};

export const PolicyCard = ({ policy }: PolicyCardProps) => {
	return (
		<Card className="flex-row p-5">
			<div className="flex-1 space-y-2">
				<CardHeader className="">
					<CardTitle>{policy.name}</CardTitle>
					<CardDescription>{policy.description}</CardDescription>
				</CardHeader>
				<CardContent className="flex gap-2">
					<div className="">
						<ul className="space-y-1 list-none">
							{['Обов’язковий', 'Необов’язковий'].map((option) => (
								<li key={option} className="flex items-center gap-2 text-sm">
									<CheckIcon className="size-4 text-emerald-500" />
									{option}
								</li>
							))}
						</ul>
					</div>
				</CardContent>
			</div>
			<div className="flex flex-row-reverse gap-3 items-center justify-start self-start">
				<Button variant="default" asChild>
					<Link href={ROUTES.POLICY(policy.slug)}>
						<HandCoinsIcon className="size-4 font-semibold" />
						Купити онлайн
					</Link>
				</Button>
				<p className="text-sm font-bold">Ціна: {policy.price} ₴</p>
			</div>
		</Card>
	);
};
