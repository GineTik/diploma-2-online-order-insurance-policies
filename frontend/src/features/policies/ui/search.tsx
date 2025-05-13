import { Input } from '@/shared/ui/input';
import { useCustomSearchParam } from '@/shared/search-params';

export const PolicySearch = () => {
	const { currentValue, handleValueChange } = useCustomSearchParam('search');

	return (
		<div className="flex items-center gap-2">
			<Input
				placeholder="Пошук"
				className="rounded-lg"
				defaultValue={currentValue}
				onChange={(e) => handleValueChange(e.target.value)}
			/>
		</div>
	);
};
