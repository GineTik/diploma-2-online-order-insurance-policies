export type FieldType = (typeof fieldTypes)[number];
export const fieldTypes = [
	'string',
	'number',
	'select',
	'text',
	'car-number',
	'boolean',
] as const;

export const FIELD_TYPES = {
	SELECT: 'select',
	NUMBER: 'number',
	STRING: 'string',
	TEXT: 'text',
	CAR_NUMBER: 'car-number',
	BOOLEAN: 'boolean',
};
