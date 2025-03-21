import { v4 } from 'uuid';

export const generateId = (prefix: string): string => `${prefix}_${v4()}`;
