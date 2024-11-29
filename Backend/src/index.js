import express from 'express'

import registerRoutes from "./routes/register.routes.js"


const app = express()

app.use(express.json());

app.use("/api", registerRoutes)

app.listen(3000)
console.log("server o port: ",3000)