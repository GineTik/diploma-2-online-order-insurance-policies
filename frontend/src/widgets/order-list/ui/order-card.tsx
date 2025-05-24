import {
	ApproveDialog,
	Badge,
	Button,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/shared/ui';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import { H2, H3, H4 } from '@/shared/ui/headings';
import { CheckIcon, DownloadIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Order } from '@/entities/orders';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';
import { useUpdateOrder } from '../hooks/use-update-order';

type OrderItemProps = {
	order: Order;
	companyView?: boolean;
};

export const OrderCard = (props: OrderItemProps) => {
	const { companyView } = props;

	return (
		<Card className="divide-y divide-border *:py-3 py-0">
			<ItemHeader {...props} />
			<PoliceDetails {...props} />
			<OrderDetails {...props} />
			{companyView ? (
				<CompanyActionsFooter
					orderStatus={props.order.status}
					orderId={props.order.id}
				/>
			) : (
				<ItemFooter {...props} />
			)}
		</Card>
	);
};

const ItemHeader = ({ order }: OrderItemProps) => {
	return (
		<CardHeader className="flex items-center gap-2">
			<H3>№{order.id}</H3>
			<Badge variant="outline">{order.status}</Badge>
			<p className="text-sm text-muted-foreground ml-auto">
				Замовлено {format(new Date(order.createdAt), 'dd.MM.yyyy')}
			</p>
		</CardHeader>
	);
};

const PoliceDetails = ({ order: { policy } }: OrderItemProps) => {
	return (
		<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2 py-5">
			<div>
				<span className="text-sm text-muted-foreground">Поліс</span>
				<div className="flex items-center gap-2">
					<H3>{policy.name}</H3>
					<Badge variant="outline">Версія {policy.version}</Badge>
				</div>
				<p className="">{policy.description}</p>
			</div>
			<div>
				<ul className="space-y-1 list-none mt-2">
					{policy.options.map((option, index) => (
						<li key={index} className="flex items-center gap-2 text-sm">
							<CheckIcon className="size-4 text-emerald-500" />
							{option}
						</li>
					))}
				</ul>
			</div>
		</CardContent>
	);
};

const ItemFooter = ({ order: { policy, status, id } }: OrderItemProps) => {
	return (
		<CardFooter className="flex items-start md:items-center gap-2 md:flex-row flex-col">
			{status === 'COMPLETED' && <ActiveDownloadButton orderId={id} />}
			{status === 'PENDING' && (
				<InactiveDownloadButton companyName={policy.company.name} />
			)}
			{status === 'CANCELLED' && (
				<div className="space-y-1 md:max-w-1/2">
					<Badge variant="destructive">Вам відхилено страхування</Badge>
					<p className="text-sm text-muted-foreground">
						Зв&apos;яжіться з компанією {policy.company.name} для отримання
						додаткової інформації
					</p>
				</div>
			)}

			<p className="text-sm text-muted-foreground">
				Сума замовлення: {policy.price} грн
			</p>
			<p className="text-sm text-muted-foreground md:ml-auto">
				У компанії{' '}
				<Button variant="link" className="text-muted-foreground px-1" asChild>
					<Link href={ROUTES.COMPANY_PROFILE(policy.company.id)}>
						{policy.company.name}
					</Link>
				</Button>
			</p>
		</CardFooter>
	);
};

const ActiveDownloadButton = ({ orderId }: { orderId: string }) => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="secondary" asChild>
					<Link href={ROUTES.DOWNLOAD_ORDER_PDF(orderId)} download>
						<DownloadIcon className="size-4 mr-2" />
						Завантажити документ
					</Link>
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Функція Завантаження документа ще в розробці</p>
			</TooltipContent>
		</Tooltip>
	);
};

const InactiveDownloadButton = ({ companyName }: { companyName: string }) => {
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
					Документ буде доступний після обробки компранією {companyName},
					зачекайте трохи
				</p>
			</TooltipContent>
		</Tooltip>
	);
};

const CompanyActionsFooter = ({
	orderStatus,
	orderId,
}: {
	orderStatus: string;
	orderId: string;
}) => {
	const { updateOrder, isUpdating } = useUpdateOrder();

	return (
		<CardFooter className="flex gap-2">
			{orderStatus === 'PENDING' ? (
				<>
					<ApproveDialog
						title="Погодження замовлення"
						description="Ви впевнені, що хочете погодити це замовлення?"
						onConfirm={() => {
							updateOrder({ orderId, status: 'approve' });
						}}
						confirmText="Погодити"
						confirmIsLoading={isUpdating}
					>
						<Button variant="secondary">Погодити</Button>
					</ApproveDialog>
					<ApproveDialog
						title="Відхилення замовлення"
						description="Ви впевнені, що хочете відхилити це замовлення?"
						onConfirm={() => {
							updateOrder({ orderId, status: 'cancel' });
						}}
						confirmText="Відхилити"
						confirmVariant="destructive"
						confirmIsLoading={isUpdating}
					>
						<Button variant="destructive">Відхилити</Button>
					</ApproveDialog>
				</>
			) : (
				<p className="text-sm text-muted-foreground">Погоджено</p>
			)}
		</CardFooter>
	);
};

const OrderDetails = ({ order: { informations } }: OrderItemProps) => {
	return (
		<div>
			<H4 className="mb-2">Деталі замовлення</H4>
			<table className="w-full text-sm bg-background rounded-lg">
				<tbody className="">
					{informations?.map((field, index) => (
						<tr
							key={index}
							className="grid grid-cols-2 py-1.5 px-3 first:pt-3 last:pb-3 border-b not-[:last-child]:border-black/10"
						>
							<td className="">{field.key}</td>
							<td className="">{field.value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
