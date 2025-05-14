export const POLICY_NOT_FOUND_ERROR = (slug: string) =>
	`Policy not found by ${slug}`;

export const COMPANY_NOT_FOUND = (companyId: string) =>
	`Company not found by ${companyId}`;

export const COMPANY_NOT_FOUND_BY_ADMIN_ID = (clerkId: string) =>
	`Company not found by admin ${clerkId}`;

export const FORBIDDEN_GENERATE_PDF =
	'You are not allowed to generate this PDF';

export const USER_ALREADY_HAVE_COMPANY = 'User already have a company';

export const USER_NOT_FOUND = (userId: string) => `User not found by ${userId}`;

export const ORDER_NOT_FOUND = 'Order not found';

export const CATEGORY_NOT_FOUND_ERROR = (id: string) =>
	`Category not found by ${id}`;

export const USER_HAS_NO_COMPANY = (userId: string) =>
	`User has no company by ${userId}`;

export const POLICY_ALREADY_EXISTS = (slug: string) =>
	`Policy already exists by ${slug}`;

export const USER_IS_NOT_POLICY_OWNER = (userId: string) =>
	`User is not policy owner by ${userId}`;
