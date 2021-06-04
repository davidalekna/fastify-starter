import { startServer } from './start';

const isTest = process.env.NODE_ENV === 'test';

startServer();
