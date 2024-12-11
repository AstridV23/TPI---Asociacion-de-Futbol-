import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router()
const prisma = new PrismaClient()

// crear una nueva division
router.post('/division', async (req, res) => {
    try {
      // Obtener el tipo de la división desde el cuerpo de la solicitud
        const { Tipo } = req.body;

      // Verificar que el campo Tipo esté presente
        if (!Tipo) {
            return res.status(400).json({ error: "El campo 'Tipo' es obligatorio." });
        }

      // Crear la nueva división en la base de datos
        const nuevaDivision = await prisma.division.create({
            data: {
                Tipo,
            },
        });

      // Devolver la respuesta con la nueva división creada
        res.status(201).json(nuevaDivision);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un error al crear la división." });
    }
});

// trae todas las divisiones
router.get('/divisiones', async (req, res) => {
    try {

        const divisiones = await prisma.division.findMany();
        return res.status(200).json(divisiones); 

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al obtener las categorías" });
    }
});

// elimina una division
router.delete('/division/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const division = await prisma.division.findUnique({
            where: { division_Id: parseInt(id) },
        });

        if ( division) {
            return res.status(404).json({ error: "División no encontrada" });
        }

        const { Tipo } = division;

        await prisma.division.delete({
            where: { division_Id: parseInt(id) },
        });

        return res.status(200).json({
            message: `División con nombre "${Tipo}" eliminada exitosamente`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al eliminar la división" });
    }
});


export default router