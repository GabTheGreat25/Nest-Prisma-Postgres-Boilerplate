import * as dotenv from "dotenv";
import { RESOURCE } from "src/constants";

dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || RESOURCE.DEVELOPMENT,
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://postgres:!Admin123@localhost:5432/capstone_db?schema=public",
  PORT: process.env.PORT || 4000,
  SALT_NUMBER: Number(process.env.SALT_NUMBER) || 12,
};
