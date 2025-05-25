import './globals.css';
import { Providers } from './providers';
import { cn } from '@/shared/lib/utils';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

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
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
