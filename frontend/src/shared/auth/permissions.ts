export const PERMISSIONS = {
	MANAGE_POLICY_CATEGORIES: 'policy-category:manage',
};

export const hasPermission = (
	userPermissions: string[],
	expectedPermission: string,
) => {
	return userPermissions.includes(expectedPermission);
};
