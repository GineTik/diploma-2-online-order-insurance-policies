import { Button } from '@/shared/ui';

export const SuccessOrder = () => {
	return (
		<div className="flex flex-col items-center justify-center p-10 rounded-default bg-surface">
			<h1 className="text-2xl font-bold">Замовлення успішно оформлено</h1>
			<p className="text-sm text-muted-foreground">
				Ваше замовлення буде оброблено протягом 10 хвилин.
			</p>
			<Button variant="link" className="w-full font-bold">
				До ваших замовлень
			</Button>
		</div>
	);
};
