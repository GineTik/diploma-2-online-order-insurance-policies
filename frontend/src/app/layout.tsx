'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Header } from '@/widgets/header';
import { cn } from '@/shared/lib/utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/shared/ui/tooltip';
const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const queryClient = new QueryClient();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://rsms.me/" />
				<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
				<link
					href="https://fonts.cdnfonts.com/css/gilroy-bold"
					rel="stylesheet"
				></link>
			</head>
			<body
				className={cn(
					`${geistSans.variable} ${geistMono.variable} antialiased`,
				)}
			>
				<TooltipProvider>
					<QueryClientProvider client={queryClient}>
						<ClerkProvider>
							<Header />
							{children}
						</ClerkProvider>
					</QueryClientProvider>
				</TooltipProvider>
			</body>
		</html>
	);
}
