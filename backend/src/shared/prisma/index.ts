export * from './prisma.module';
export * from './prisma.service';

export const isNotDeleted = {
	OR: [{ isDeleted: false }, { isDeleted: { isSet: false } }],
};
