import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { SearchIcon } from 'lucide-react';

export const PolicySearch = () => {
	return (
		<div className="flex items-center gap-2">
			<Input placeholder="Пошук" className="border-none" />
			<Button variant="card" size="icon">
				<SearchIcon className="size-4" />
			</Button>
		</div>
	);
};
