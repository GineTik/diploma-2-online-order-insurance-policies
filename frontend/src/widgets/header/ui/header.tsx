'use client';

import { CustomSignInButton, CustomSignUpButton } from '@/features/auth';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Navbar } from './navbar';
import { NavigationDropdown } from './navigation-dropdown';

export const Header = () => {
	return (
		<div className="flex justify-between items-center p-4 relative">
			<div className="text-xl font-bold uppercase">best.finance</div>
			<div className="absolute left-1/2 -translate-x-1/2">
				<Navbar />
			</div>
			<div className="flex items-center gap-2 ml-auto">
				<SignedIn>
					<NavigationDropdown />
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
