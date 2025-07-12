import { envVars } from "./app/config/index";
/* eslint-disable no-console */
// worked for server like connection database ODM etc
import { Server } from "http";

import mongoose from "mongoose";
import app from "./app";
import { seedSuperAdmin } from "./utils/seedSuperAdmin";

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(envVars.db_connection_string);
    console.log("Connected to mongodb Successfully");

    server = app.listen(envVars.connection_port, () => {
      console.log(
        "App is listening to the port number",
        envVars.connection_port
      );
    });
  } catch (error) {
    console.log(error);
  }
}

/*
 * unhandled error
 * uncaught error
 * SigTerm
 */

(async () => {
  await bootstrap();
  await seedSuperAdmin();
})();

process.on("unhandledRejection", (error) => {
  console.log("Unhandled Rejection Occured!!!", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log("uncaughtException Occured!!!", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM Occured!!!");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT Occured!!!");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Promise.reject(new Error("ami try catch er bairer error"));
// throw new Error("Ami vai local error");
