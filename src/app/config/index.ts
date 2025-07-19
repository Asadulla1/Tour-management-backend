import dotenv from "dotenv";

dotenv.config();

interface EnvVars {
  db_connection_string: string;
  connection_port: string;
  node_env: "development" | "production";
  jwt_access_secret: string;
  jwt_expires_time: string;
  jwt_refresh_secret: string;
  jwt_refresh_time: string;
  bcrypt_salt_round: string;
  super_admin_email: string;
  super_admin_password: string;
  google_client_id: string;
  google_client_secret: string;
  google_callback_url: string;
  express_session_secret: string;
  frontend_url: string;
}

const loadEnvVars = (): EnvVars => {
  const requiredEnvVars = [
    "DB_CONNECTION_STRING",
    "PORT",
    "NODE_ENV",
    "JWT_ACCESS_SECRET",
    "JWT_EXPIRES_TIME",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_TIME",
    "BCRYPT_SALT_ROUND",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "EXPRESS_SESSION_SECRET",
    "FRONTEND_URL",
  ];
  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable ${key}`);
    }
  });
  return {
    db_connection_string: process.env.DB_CONNECTION_STRING as string,
    connection_port: process.env.PORT as string,
    node_env: process.env.NODE_ENV as "development" | "production",
    jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
    jwt_expires_time: process.env.JWT_EXPIRES_TIME as string,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET as string,
    jwt_refresh_time: process.env.JWT_REFRESH_TIME as string,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND as string,
    super_admin_email: process.env.SUPER_ADMIN_EMAIL as string,
    super_admin_password: process.env.SUPER_ADMIN_PASSWORD as string,
    google_client_id: process.env.GOOGLE_CLIENT_ID as string,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    google_callback_url: process.env.GOOGLE_CALLBACK_URL as string,
    express_session_secret: process.env.EXPRESS_SESSION_SECRET as string,
    frontend_url: process.env.FRONTEND_URL as string,
  };
};

export const envVars: EnvVars = loadEnvVars();
