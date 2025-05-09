'use client';

import { CustomSignInButton, CustomSignUpButton } from '@/features/auth';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Navbar } from './navbar';
import { CreateCompanyPageLink } from '@/entities/companies/ui/link-to-create-page';
import { LinkToCompanyProfile } from '@/entities/companies/ui/link-to-company-profile';
import { useUserCompany } from '@/entities/companies/hooks/get-user-company';
import { Skeleton } from '@/shared/ui/skeleton';

export const Header = () => {
	const { company, isCompanyLoading } = useUserCompany();

	return (
		<div className="flex justify-between items-center p-4 relative">
			<div className="text-xl font-bold uppercase">best.finance</div>
			<div className="absolute left-1/2 -translate-x-1/2">
				<Navbar />
			</div>
			<div className="flex items-center gap-2 ml-auto">
				<SignedIn>
					{isCompanyLoading ? (
						<Skeleton className="w-26 h-8 rounded-default" />
					) : company == undefined ? (
						<CreateCompanyPageLink />
					) : (
						<LinkToCompanyProfile />
					)}
					<UserButton />
				</SignedIn>
				<SignedOut>
					<CustomSignInButton />
					<CustomSignUpButton />
				</SignedOut>
			</div>
		</div>
	);
};
