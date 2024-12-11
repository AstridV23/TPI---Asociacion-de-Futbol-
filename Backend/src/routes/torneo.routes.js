import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Ruta para crear un nuevo torneo
router.post('/torneo', async (req, res) => {
    try {
        // Destructurar datos del cuerpo de la solicitud
        const { 
            Nombre, 
            Fecha_Inicio, 
            Fecha_Fin, 
            CategoriaID, 
            dni_encargado,
            Fecha_Inicio_Inscripcion,
            Fecha_fin_Inscripcion,
        } = req.body;

        // Validación de campos obligatorios
        if (!Nombre || !Fecha_Inicio || !Fecha_Fin) {
            return res.status(400).json({ 
                error: 'Faltan campos obligatorios para crear el torneo' 
            });
        }

        // Crear nuevo torneo en la base de datos
        const nuevoTorneo = await prisma.torneo.create({
            data: {
                Nombre,
                Fecha_Inicio: new Date(Fecha_Inicio),
                Fecha_Fin: new Date(Fecha_Fin),
                Categoria: CategoriaID,
                dni_encargado: dni_encargado,
                Fecha_Inicio_Inscripcion: new Date(Fecha_Inicio_Inscripcion),
                Fecha_Fin_Inscripcion: new Date(Fecha_fin_Inscripcion),
            }
        });

        res.status(201).json({ 
            mensaje: 'Torneo creado exitosamente', 
            torneo: {
                //ID: nuevoTorneo.ID,
                Nombre: nuevoTorneo.Nombre,
                Fecha_Inicio: nuevoTorneo.Fecha_Inicio,
                Fecha_Fin: nuevoTorneo.Fecha_Fin,
                Fecha_Inicio_Inscripcion: nuevoTorneo.Fecha_Inicio_Inscripcion,
                Fecha_fin_Inscripcion: nuevoTorneo.Fecha_Fin_Inscripcion,
            }
        });

    } catch (error) {
        console.error('Error al crear torneo:', error);

        // Manejo de errores específicos de Prisma
        if (error.code === 'P2002') {
            return res.status(409).json({ 
                error: 'Ya existe un torneo con este nombre' 
            });
        }

        // Errores de validación de fecha
        if (error instanceof TypeError) {
            return res.status(400).json({ 
                error: 'Formato de fecha inválido' 
            });
        }

        res.status(500).json({ 
            error: 'Error interno del servidor al crear torneo' 
        });
    }
});

// Ruta para obtener todos los torneos
router.get('/torneo', async (req, res) => {
    try {
        const torneos = await prisma.torneo.findMany({
            select: {
                Nombre: true,
                Fecha_Inicio: true,
                Fecha_Fin: true,
            }
        });

        res.status(200).json(torneos);
    } catch (error) {
        console.error('Error al listar torneos:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor al listar torneos' 
        });
    }
});

export default router;