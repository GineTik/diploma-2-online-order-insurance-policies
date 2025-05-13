import {
	Badge,
	Button,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/shared/ui';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import { H3 } from '@/shared/ui/headings';
import { CheckIcon, DownloadIcon } from 'lucide-react';

export const OrderCard = () => {
	return (
		<Card className="divide-y divide-border *:py-3 py-0">
			<ItemHeader />
			<PoliceDetails />
			<ItemFooter />
		</Card>
	);
};

const ItemHeader = () => {
	return (
		<CardHeader className="flex items-center gap-2">
			<H3>Замовлення №1234567890</H3>
			<Badge variant="outline">Підтверджено</Badge>
			<p className="text-sm text-muted-foreground ml-auto">
				Замовлено 12.05.2025
			</p>
		</CardHeader>
	);
};

const PoliceDetails = () => {
	return (
		<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2 py-5">
			<div>
				<span className="text-sm text-muted-foreground">Поліс</span>
				<H3>Страхування життя</H3>
				<p className="">Опис полісу</p>
			</div>
			<div>
				<ul className="space-y-1 list-none mt-2">
					{['Страхування життя', 'Страхування життя', 'Страхування життя'].map(
						(option, index) => (
							<li key={index} className="flex items-center gap-2 text-sm">
								<CheckIcon className="size-4 text-emerald-500" />
								{option}
							</li>
						),
					)}
				</ul>
			</div>
		</CardContent>
	);
};

const ItemFooter = () => {
	return (
		<CardFooter className="flex md:items-center gap-2 md:flex-row flex-col">
			<InactiveDownloadButton />
			<p className="text-sm text-muted-foreground">Сума замовлення: 1000 грн</p>
			<p className="text-sm text-muted-foreground md:ml-auto">
				У компанії{' '}
				<Button variant="link" className="text-muted-foreground px-1">
					OVOA
				</Button>
			</p>
		</CardFooter>
	);
};

const ActiveDownloadButton = () => {
	return (
		<Button variant="default">
			<DownloadIcon className="size-4 mr-2" />
			Завантажити документ
		</Button>
	);
};

const InactiveDownloadButton = () => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="outline" className="cursor-default">
					<DownloadIcon className="size-4 mr-2" />
					Завантажити документ
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>
					Документ буде доступний після обробки компранією OVOA, зачекайте
					трішки
				</p>
			</TooltipContent>
		</Tooltip>
	);
};
