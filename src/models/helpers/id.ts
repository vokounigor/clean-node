import { v4 } from 'uuid';

export const generateId = (prefix: string) => `${prefix}_${v4()}`;
