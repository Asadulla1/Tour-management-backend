import dotenv from "dotenv";

dotenv.config();

interface EnvVars {
  db_connection_string: string;
  connection_port: string;
  node_env: "development" | "production";
}

const loadEnvVars = (): EnvVars => {
  const requiredEnvVars = ["DB_CONNECTION_STRING", "PORT", "NODE_ENV"];
  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable ${key}`);
    }
  });
  return {
    db_connection_string: process.env.DB_CONNECTION_STRING as string,
    connection_port: process.env.PORT as string,
    node_env: process.env.NODE_ENV as "development" | "production",
  };
};

export const envVars: EnvVars = loadEnvVars();
