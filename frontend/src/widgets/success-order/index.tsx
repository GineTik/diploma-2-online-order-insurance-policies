import { ROUTES } from '@/shared/constants/routes';
import { Button, H2 } from '@/shared/ui';
import { Card, CardContent } from '@/shared/ui/card';
import Link from 'next/link';

export const SuccessOrder = () => {
	return (
		<Card className="flex flex-col items-center justify-center p-10">
			<CardContent className="*:text-center space-y-2">
				<H2 className="">Замовлення успішно оформлено</H2>
				<p className="text-sm text-muted-foreground">
					Ваше замовлення буде оброблено протягом 10 хвилин.
				</p>
				<Button variant="link" className="w-full font-bold" asChild>
					<Link href={ROUTES.ORDERS}>До ваших замовлень</Link>
				</Button>
			</CardContent>
		</Card>
	);
};
