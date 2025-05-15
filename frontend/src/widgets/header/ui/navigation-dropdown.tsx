import { useUserCompany } from '@/entities/companies/hooks/use-user-company';
import { ROUTES } from '@/shared/constants/routes';
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui';
import { Skeleton } from '@/shared/ui/skeleton';
import { ArrowDown01 } from 'lucide-react';
import Link from 'next/link';

export const NavigationDropdown = () => {
	const { company, isCompanyLoading } = useUserCompany();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="card">
					Навігація
					<ArrowDown01 />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>
					<Link href={ROUTES.ORDERS}>Ваші замовлення</Link>
				</DropdownMenuItem>
				{isCompanyLoading ? (
					<Skeleton className="w-26 h-8 rounded-md" />
				) : company == undefined ? (
					<DropdownMenuItem>
						<Link href={ROUTES.CREATE_COMPANY}>Створити компанію</Link>
					</DropdownMenuItem>
				) : (
					<>
						<DropdownMenuItem>
							<Link href={ROUTES.COMPANY_PROFILE(company.id)}>
								Ваша компанія
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href={ROUTES.COMPANY_ORDERS(company.id)}>
								Замовлення компанії
							</Link>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
