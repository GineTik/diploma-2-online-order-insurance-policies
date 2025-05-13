import { useUserPermissions } from '../hooks/use-user-permissions';

export const PermissionList = () => {
	const { permissions, permissionLoading } = useUserPermissions();

	if (permissionLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{permissions?.map((permission) => (
				<div key={permission}>{permission}</div>
			))}
		</div>
	);
};
