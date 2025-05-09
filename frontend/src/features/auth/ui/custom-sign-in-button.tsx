import { Button } from '@/shared/ui';
import { SignInButton } from '@clerk/nextjs';

export const CustomSignInButton = () => {
	return (
		<Button variant="card" size="sm">
			<SignInButton />
		</Button>
	);
};
