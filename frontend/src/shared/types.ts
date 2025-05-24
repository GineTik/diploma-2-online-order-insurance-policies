export type FieldType = (typeof fieldTypes)[number];
export const fieldTypes = ['string', 'number', 'select', 'text'] as const;
