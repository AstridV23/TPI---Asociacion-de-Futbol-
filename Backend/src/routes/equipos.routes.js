import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router()
const prisma = new PrismaClient()

router.post('/equipo', async (req, res) => {
    try {
        const { Nombre, DT, Categoria, Division} = req.body;

        if(!Nombre, ! DT) return res.status(400).json({ error: 'Faltan campos obligatorios' });

        const equipoExistente = await prisma.equipo.findUnique({
            where: { Nombre }
        });

        if (usuarioExistente) {
            return res.status(409).json({ error: 'Ya existe un equipo con ese nombre' });
        }
    }
    catch{}
})