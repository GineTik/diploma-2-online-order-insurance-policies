import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getPolicyWord(count: number): string {
	if (count % 10 === 1 && count % 100 !== 11) {
		return 'страховий поліс';
	} else if (
		[2, 3, 4].includes(count % 10) &&
		![12, 13, 14].includes(count % 100)
	) {
		return 'страхові поліси';
	} else {
		return 'страхових полісів';
	}
}
