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

router.get('/equipos', async (req, res) => {
    try {
        const { categoriaId } = req.query; // Obtén el ID de la categoría desde los parámetros de la query

        // Si no se proporciona una categoría, devolvemos un error
        if (!categoriaId) {
            return res.status(400).json({ error: 'Se debe proporcionar el ID de la categoría' });
        }

        // Consulta los equipos que pertenecen a la categoría especificada
        const equipos = await prisma.equipo.findMany({
            where: {
                Categoria_Id: parseInt(categoriaId) // Filtrar por Categoria_Id
            },
        });

        // Si no se encuentran equipos, devolvemos un mensaje adecuado
        if (equipos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron equipos en esta categoría' });
        }

        // Devolver los equipos encontrados
        res.json(equipos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al obtener los equipos' });
    }
});

router.get('/equipos_mostrar', async (req, res) => {
    try {
        // Consulta todos los equipos en la base de datos
        const equipos = await prisma.equipo.findMany({
            include: {
                Categoria: true,  // Incluye la información de la categoría si la necesitas
                Division: true,   // Incluye la información de la división si la necesitas
            }
        });

        // Si no se encuentran equipos, devolver un mensaje adecuado
        if (equipos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron equipos' });
        }

        // Devolver todos los equipos
        res.json(equipos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al obtener los equipos' });
    }
});


export default router