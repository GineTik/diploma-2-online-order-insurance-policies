import { Button, ButtonProps } from './button';
import { Loader2 } from 'lucide-react';

type LoadingButtonProps = ButtonProps & {
	isLoading?: boolean;
};

export const LoadingButton = ({
	isLoading,
	children,
	...props
}: LoadingButtonProps) => {
	return (
		<Button disabled={isLoading} {...props}>
			{isLoading ? <Loader2 className="size-4 animate-spin" /> : children}
		</Button>
	);
};
