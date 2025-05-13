import { PolicySearch } from '@/features/policies';
import { Card, CardContent } from '@/shared/ui/card';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/shared/ui/select';

export const PolicyFiltration = () => {
	return (
		<Card className="">
			<CardContent className="space-y-2">
				<PolicySearch />
				<div className="flex items-center gap-2">
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Сортувати за" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="price">Ціна</SelectItem>
							<SelectItem value="name">Назва</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	);
};
