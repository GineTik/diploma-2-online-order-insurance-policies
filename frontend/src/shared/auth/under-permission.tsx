'use client';

import { useUserPermissions } from '@/entities/users';
import { hasPermission } from './permissions';

export const UnderPermission = ({
	children,
	permission,
}: {
	children: React.ReactNode;
	permission: string;
}) => {
	const { permissions } = useUserPermissions();

	if (!hasPermission(permissions || [], permission)) {
		return null;
	}

	return children;
};
