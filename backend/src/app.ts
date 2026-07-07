import express from "express";
import { corsMiddleware } from "./middleware/cors";
import { rateLimiter } from "./middleware/rateLimiter";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import routes from "./routes";

const app = express();

app.use(corsMiddleware);
app.use(express.json({ limit: "10mb" }));
app.use(rateLimiter);

app.use("/api/v1", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
