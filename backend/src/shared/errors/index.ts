export const POLICY_NOT_FOUND_ERROR = (slug: string) =>
	`Policy not found by ${slug}`;

export const COMPANY_NOT_FOUND_ERROR = (companyId: string) =>
	`Company not found by ${companyId}`;

export const FORBIDDEN_GENERATE_PDF =
	'You are not allowed to generate this PDF';

export const USER_ALREADY_HAVE_COMPANY = 'User already have a company';

export const USER_NOT_FOUND = (userId: string) => `User not found by ${userId}`;
