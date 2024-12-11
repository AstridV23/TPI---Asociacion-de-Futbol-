import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router()
const prisma = new PrismaClient()

// crea un equipo
router.post('/equipo', async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { Nombre, DT, Division_Id, DNI_Representante, Categoria_Id } = req.body;

        // Validar campos obligatorios
        if (!Nombre || !DT || !Division_Id || !DNI_Representante || !Categoria_Id) {
            return res.status(400).json({ error: 'Faltan campos obligatorios.' });
        }

        // Verificar si ya existe un equipo con el mismo nombre
        const equipoExistente = await prisma.equipo.findUnique({
            where: { Nombre },
        });

        if (equipoExistente) {
            return res.status(409).json({ error: 'Ya existe un equipo con ese nombre.' });
        }

        // Crear el nuevo equipo en la base de datos
        const nuevoEquipo = await prisma.equipo.create({
            data: {
                Nombre,
                DT,
                Division_Id,
                DNI_Representante,
                Categoria_Id,
            },
        });

        // Responder con el equipo creado
        res.status(201).json(nuevoEquipo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al crear el equipo.' });
    }
});

// busca por id de categoria
// ej: http://localhost:3000/api/equipos?categoriaId=3
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
            include: {
                Categoria: true,  // Incluye la información de la categoría si la necesitas
                Division: true,   // Incluye la información de la división si la necesitas
            }
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

// muestra todos los equipos
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