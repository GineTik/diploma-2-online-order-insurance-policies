export const ROUTES = {
	HOME: '/',
	ALL_COMPANIES: '/companies',
	CREATE_COMPANY: '/companies/create',
	COMPANY_PROFILE: (id: string) => `/companies/${id}`,
	POLICY_LIST: (category: string) => `/${category}/offers`,
	POLICY: (slug: string) => `/policies/${slug}`,
	SUCCESS_ORDER: (slug: string) => `/policies/${slug}/success`,
	ORDERS: '/orders',
};
