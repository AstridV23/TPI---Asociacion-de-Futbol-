import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router()
const prisma = new PrismaClient()

// crea una nueva categoria
router.post('/categoria', async (req, res) => {
    try {
        const { Tipo, Edad_Min, Edad_Max, Descripcion } = req.body;

        console.log(req.body)

        // Validación actualizada considerando Tipo como opcional
        if (typeof Edad_Min !== 'number' || typeof Edad_Max !== 'number') {
            return res.status(400).json({error: "Edad_Min y Edad_Max son obligatorios"});
        }
        
        if (Edad_Max <= Edad_Min) {
            return res.status(400).json({error: "Datos de edad incorrectos"});
        }
    
        const nuevaCategoria = await prisma.categoria.create({
            data: {
                ...(Tipo && { Tipo }), // Inclusión condicional de Tipo
                Edad_Min,
                Edad_Max,
                ...(Descripcion && { Descripcion }) // Inclusión condicional de Descripcion
            }
        });

        res.status(201).json(nuevaCategoria)
    
      } catch (error) {
        console.error('Error al crear categoría:', error);
        return res.status(500).json({error: "Error al crear una categoría", detalle: error.message})
      }
})

// trae todas las categorias
router.get('/categoria', async (req, res) => {
    try {
        const { Tipo } = req.query;
        
        if (Tipo) {
            const categoria = await prisma.categoria.findUnique({
                where: { Tipo },
            });

            if (!categoria) {
                return res.status(404).json({ error: `No se encontró una categoría con el nombre "${Tipo}"` });
            }

            return res.status(200).json(categoria);
        }

        const categorias = await prisma.categoria.findMany();
        return res.status(200).json(categorias); 

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al obtener las categorías" });
    }
});

// elimina una categoria
router.delete('/categoria/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await prisma.categoria.findUnique({
            where: { Categoria_Id: parseInt(id) },
        });

        if (!categoria) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        const { Tipo } = categoria;

        await prisma.categoria.delete({
            where: { Categoria_Id: parseInt(id) },
        });

        return res.status(200).json({
            message: `Categoría con nombre "${Tipo}" eliminada exitosamente`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al eliminar la categoría" });
    }
});


export default router