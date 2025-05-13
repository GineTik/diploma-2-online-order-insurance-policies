import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui';
import Link from 'next/link';

type OrderActionProps = {
	slug: string;
};

export const OrderAction = ({ slug }: OrderActionProps) => {
	return (
		<Button variant="default" className="w-full font-bold" asChild>
			<Link href={ROUTES.SUCCESS_ORDER(slug)}>КУПИТИ ОНЛАЙН</Link>
		</Button>
	);
};
