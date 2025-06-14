import dotenv from 'dotenv';

dotenv.config();
const DEFAULT_PORT = 4000;

export const config = {
  EXPOSE_SERVER_PORT: process.env.EXPOSE_SERVER_PORT ? Number(process.env.EXPOSE_SERVER_PORT) : DEFAULT_PORT,
  PROJECT_TYPE: process.env.PROJECT_TYPE,
};
