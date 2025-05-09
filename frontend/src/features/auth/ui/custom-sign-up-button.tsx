import { SignUpButton } from '@clerk/nextjs';
import { Button } from '@/shared/ui';

export const CustomSignUpButton = () => {
	return (
		<Button variant="default" size="sm">
			<SignUpButton />
		</Button>
	);
};
