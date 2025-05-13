import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui';
import { useCustomSearchParam } from '@/shared/search-params';

export const SortSelect = () => {
	const { currentValue, handleValueChange } = useCustomSearchParam('sort');

	return (
		<Select value={currentValue} onValueChange={handleValueChange}>
			<SelectTrigger className="rounded-lg">
				<SelectValue placeholder="Сортувати" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="none">Без сортування</SelectItem>
				<SelectItem value="price-asc">Від дешевих до дорогих</SelectItem>
				<SelectItem value="price-desc">Від дорогих до дешевих</SelectItem>
			</SelectContent>
		</Select>
	);
};
