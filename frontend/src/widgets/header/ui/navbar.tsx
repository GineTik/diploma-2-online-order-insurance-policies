import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/shared/ui';
import Link from 'next/link';
import { useMenu } from '@/entities/menu';

export const Navbar = () => {
	const menu = useMenu();

	return (
		<NavigationMenu>
			<NavigationMenuList>
				{menu.map((item, index) => (
					<NavigationMenuItem key={index} className="text-semibold">
						<NavigationMenuLink href={item.href ?? '#'}>
							{item.label}
						</NavigationMenuLink>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
