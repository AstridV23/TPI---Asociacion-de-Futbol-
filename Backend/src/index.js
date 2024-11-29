import express from 'express'
import cors from "cors";

import registerRoutes from "./routes/register.routes.js"
import loginRoutes from "./routes/login.routes.js"


const app = express()

app.use(express.json());

app.use(
    cors({
      origin: 'http://localhost:5173',
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );

app.use("/api", registerRoutes)
app.use("/api", loginRoutes)

app.listen(3000)
console.log("server o port: ",3000)