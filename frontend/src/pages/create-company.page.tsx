import { CompanyForm } from '@/entities/companies';
import { Button } from '@/shared/ui';

export const CreateCompanyPage = () => {
	return (
		<div className="p-5 max-w-[400px] mx-auto w-full">
			<CompanyForm actions={<Button className="w-full">Створити</Button>} />
		</div>
	);
};
