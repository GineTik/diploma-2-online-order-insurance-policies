import { H1 } from '@/shared/ui';
import { PolicyCategoryGrid } from '@/widgets/policy-categories';

export const MainPage = () => {
	return (
		<div className="p-5">
			<div className="text-center space-y-4 mb-10">
				<H1>Сервіс онлайн-страхування</H1>
				<p className="text-lg text-[20px]">
					Порівняння та безпечна покупка страхових полісів онлай
				</p>
			</div>
			<PolicyCategoryGrid />
		</div>
	);
};
