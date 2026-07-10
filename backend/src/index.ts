import app from "./app";
import { connectDB, isUsingMemoryDb } from "./config/db";
import { env } from "./config/env";
import { seedIfEmpty } from "./services/seedService";

const start = async () => {
  await connectDB();

  if (isUsingMemoryDb()) {
    await seedIfEmpty();
  }

  const server = app.listen(env.port, () => {
    console.log(`Server running on port ${env.port} [${env.nodeEnv}]`);
  });

  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `\nPort ${env.port} is already in use. Another backend is already running.\n` +
          `Stop it with: kill $(lsof -t -i:${env.port})\n`
      );
      process.exit(1);
    }

    throw error;
  });
};

start();
