import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './alert-dialog';
import { AlertDialog } from './alert-dialog';
import { LoadingButton } from './loading-button';

type ApproveDialogProps = {
	title: string;
	description: string;
	children: React.ReactNode;
	onConfirm: () => void;
	confirmText?: string;
	cancelText?: string;
	confirmVariant?: 'default' | 'destructive';
	confirmIsLoading?: boolean;
	preventDefault?: boolean;
};

export const ApproveDialog = ({
	title,
	description,
	children,
	onConfirm,
	confirmText = 'Продовжити',
	cancelText = 'Скасувати',
	confirmVariant = 'default',
	confirmIsLoading = false,
	preventDefault = false,
}: ApproveDialogProps) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger
				asChild
				onSelect={(e) => preventDefault && e.preventDefault()}
			>
				{children}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{cancelText}</AlertDialogCancel>
					<AlertDialogAction asChild>
						<LoadingButton
							variant={confirmVariant}
							onClick={onConfirm}
							isLoading={confirmIsLoading}
						>
							{confirmText}
						</LoadingButton>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
