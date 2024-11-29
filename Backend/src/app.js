import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("¡Hola desde el backend!");
});

export default app;