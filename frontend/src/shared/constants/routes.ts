export const ROUTES = {
	HOME: '/',
	ALL_COMPANIES: '/companies',
	CREATE_COMPANY: '/companies/create',
	COMPANY_PROFILE: (id: string) => `/companies/${id}`,
	COMPANY_ORDERS: (id: string) => `/companies/${id}/orders`,
	POLICY_LIST: (category: string) => `/${category}/offers`,
	POLICY: (slug: string) => `/policies/${slug}`,
	SUCCESS_ORDER: (slug: string) => `/policies/${slug}/success`,
	ORDERS: '/orders',
	CATEGORIES: '/categories',
	DOWNLOAD_ORDER_PDF: (id: string) =>
		`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}/generate/pdf`,
};
