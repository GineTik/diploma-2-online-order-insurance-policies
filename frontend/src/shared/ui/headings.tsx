import { cn } from '../lib/utils';

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
	children: React.ReactNode;
};

export const H1 = ({ children, className, ...props }: HeadingProps) => {
	return (
		<h1 className={cn('text-5xl font-bold', className)} {...props}>
			{children}
		</h1>
	);
};

export const H2 = ({ children, className, ...props }: HeadingProps) => {
	return (
		<h2
			className={cn('text-3xl font-normal leading-tight', className)}
			{...props}
		>
			{children}
		</h2>
	);
};

export const H3 = ({ children, className, ...props }: HeadingProps) => {
	return (
		<h3 className={cn('text-[18px] font-normal', className)} {...props}>
			{children}
		</h3>
	);
};
