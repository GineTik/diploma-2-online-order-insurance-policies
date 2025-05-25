'use client';

import { Header } from '@/widgets/header/ui/header';
import { Toaster } from 'sonner';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { TooltipProvider } from '@/shared/ui';
import { ClerkProvider } from '@clerk/nextjs';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: (failureCount) => {
				const maxRetries = 1;
				return failureCount < maxRetries;
			},
		},
	},
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
			<TooltipProvider>
				<QueryClientProvider client={queryClient}>
					<ClerkProvider>
						<Header />
						{children}
						<Toaster />
					</ClerkProvider>
				</QueryClientProvider>
			</TooltipProvider>
		</Suspense>
	);
};
