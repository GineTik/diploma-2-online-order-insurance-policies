import { PolicySearch } from '@/features/policies';
import { SortSelect } from './sort-select';

export const PolicyFiltration = () => {
	return (
		<div className="space-y-2">
			<PolicySearch />
			<div className="flex items-center gap-2">
				<SortSelect />
			</div>
		</div>
	);
};
