import { CompanyListItem } from '@/entities/companies';
import {
	Button,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui';
import { ChevronDownIcon, SearchIcon } from 'lucide-react';

export const CompanyList = () => {
	return (
		<div className="space-y-2">
			<div className="flex gap-2">
				<Input placeholder="Пошук" className="border-0" />
				<Button variant="card" size="icon" className="">
					<SearchIcon className="w-4 h-4" />
				</Button>
			</div>
			<div className="gap-2 flex">
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Сортування" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light">За назвою</SelectItem>
						<SelectItem value="dark">За кількістю полісів</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<CompanyListItem company={{ id: '1', name: 'test' }} />
			<CompanyListItem company={{ id: '2', name: 'test' }} />
			<CompanyListItem company={{ id: '3', name: 'test' }} />
		</div>
	);
};
