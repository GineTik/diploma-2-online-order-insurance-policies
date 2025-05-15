'use client';

import { CompanyCard, CompanyFilters } from '@/entities/companies';
import { Input } from '@/shared/ui';
import { Loader } from 'lucide-react';
import { useCompanies } from './hooks/use-companies';
import { useCustomSearchParam } from '@/shared/search-params';
import { useState } from 'react';
import { useEffect } from 'react';

export const CompanyList = () => {
	const search = useCustomSearchParam('search');
	const [filters, setFilters] = useState<CompanyFilters>({
		search: search.currentValue,
	});

	useEffect(() => {
		setFilters({
			search: search.currentValue,
		});
	}, [search.currentValue]);

	return (
		<div className="space-y-2">
			<div className="flex gap-2">
				<Input
					placeholder="Пошук"
					className="border-0"
					defaultValue={search.currentValue}
					onChange={(e) => search.handleValueChange(e.target.value)}
				/>
			</div>

			<CompanyListContent filters={filters} />
		</div>
	);
};

const CompanyListContent = ({ filters }: { filters: CompanyFilters }) => {
	const { companies, isLoadingCompanies } = useCompanies({
		filters,
	});

	return (
		<>
			{isLoadingCompanies ?? <Loader className="animate-spin" />}

			{companies?.map((company) => (
				<CompanyCard key={company.id} company={company} />
			))}

			{companies?.length === 0 && (
				<div className="text-center p-5">Не знайдено компаній</div>
			)}
		</>
	);
};
