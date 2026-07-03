import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// import authRoutes from "./modules/auth/auth.routes";
import authroute from "./routes/index" 
 const app = express();
import { errorHandler } from "./middleware/error.middleware";
import resumes from "./routes/index"
 

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/v1", authroute);
app.use("/api/v1", resumes);

app.use(errorHandler);

export default app;