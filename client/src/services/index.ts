export const BASE_URL = `${import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'}/api`;

export * from './node';
export * from './task';
export * from './penalty';
export * from './duration';
export * from './priority';
export * from './status';
export * from './criteria';
export * from './tracker';
export * from './color';
