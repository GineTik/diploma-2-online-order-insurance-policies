'use client';

import { usePolicy } from '@/entities/policies';
import { useParams } from 'next/navigation';
import { H2 } from '@/shared/ui/headings';
import { OrderForm } from '@/features/order';
import { CheckIcon, HomeIcon, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/shared/ui/card';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/shared/ui';
import { ROUTES } from '@/shared/constants/routes';
import { usePolicyCategory } from '@/entities/policy-categories';
import { Skeleton } from '@/shared/ui/skeleton';

export default function PolicyPage() {
	const params = useParams<{ slug: string }>();
	const { policy } = usePolicy(params?.slug ?? '');

	if (!policy) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader2 className="w-10 h-10 animate-spin" />
			</div>
		);
	}

	return (
		<Card className="space-y-2 max-w-[1000px] mx-auto w-full p-0">
			<CardContent className="*:px-10 *:py-5 divide-y divide-border">
				<div className="space-y-1">
					<PolicyBreadcrumbs
						categoryId={policy.categoryId}
						policyName={policy.name}
					/>
					<H2>{policy.name}</H2>
					<p>{policy.description}</p>
				</div>
				<div className="">
					<OrderForm
						categoryId={policy.categoryId}
						policyPrice={policy.price}
					/>
				</div>
				{policy.options.length !== 0 && (
					<div className="">
						<H2 className="mb-3">Що включає страхування</H2>
						<ul className="space-y-1 list-none">
							{policy.options.map((option) => (
								<li key={option} className="flex items-center gap-2 text-sm">
									<CheckIcon className="size-4 text-emerald-500" />
									{option}
								</li>
							))}
						</ul>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

const PolicyBreadcrumbs = ({
	categoryId,
	policyName,
}: {
	categoryId: string;
	policyName: string;
}) => {
	const { category, isLoadingCategory } = usePolicyCategory(categoryId);

	return (
		<Breadcrumb className="*:text-[12px] [&_svg]:size-4 bg-background rounded-full px-3 py-1 inline-flex mb-2">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink
						href={ROUTES.HOME}
						className="flex items-center gap-2"
					>
						<HomeIcon className="" />
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href={ROUTES.POLICY_LIST(category?.slug ?? '')}>
						{isLoadingCategory ? (
							<Skeleton className="w-20 h-4" />
						) : (
							category?.name
						)}
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>{policyName}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
};
