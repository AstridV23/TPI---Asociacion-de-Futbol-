import { Router } from "express";
import bcrypt from 'bcryptjs'
import { PrismaClient } from "@prisma/client";
import { createAccessToken } from "../libs/jwt.js";
import dotenv from 'dotenv'

const router = Router()
const prisma = new PrismaClient()

dotenv.config()

// crea una persona
router.post('/register_persona', async (req, res) => {
    try {
      const { DNI, FechaNacimiento, Direccion, Apellido, Nombre, Rol, Contrasena, Email } = req.body;
  
      // Validación básica de campos requeridos
      if (!DNI || !Apellido || !Nombre || !Contrasena) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }

      const usuarioExistente = await prisma.persona.findUnique({
        where: { DNI }
      });

      if (usuarioExistente) {
        return res.status(409).json({ error: 'El usuario ya existe' });
      }

      const passwordHash = await bcrypt.hash(Contrasena, 10);
  
      // Crear nuevo usuario
      const nuevoUsuario = await prisma.persona.create({
        data: {
          DNI,
          FechaNacimiento,
          Direccion,
          Apellido,
          Nombre,
          Rol,
          Email,
          Contrasena: passwordHash
        }
      });

      const payload = {
        DNI: nuevoUsuario.DNI,
        Nombre: nuevoUsuario.Nombre,
        Apellido: nuevoUsuario.Apellido,
        Rol: nuevoUsuario.Rol
      };

      const token = await createAccessToken(payload)
  
      res.status(201).json({ 
        mensaje: 'Usuario registrado exitosamente', 
        token,
        usuario: {
            DNI: nuevoUsuario.DNI,
            Nombre: nuevoUsuario.Nombre,
            Apellido: nuevoUsuario.Apellido,
            Rol: nuevoUsuario.Rol
        }
      });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      
      // Manejo de errores específicos de Prisma
      if (error.code === 'P2002') {
        return res.status(409).json({ error: 'Ya existe un usuario con este DNI' });
      }
  
      res.status(500).json({ error: 'Error interno del servidor' });
    }
});

  // registra un jugador
router.post('/registrar_jugador', async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { DNI_Jugador, Nro_Socio, Nro_Equipo, Telefono } = req.body;

        // Validar campos obligatorios
        if (!DNI_Jugador || !Nro_Socio || !Telefono) {
            return res.status(400).json({ error: 'Faltan campos obligatorios.' });
        }

        // Verificar si el DNI existe en la tabla Persona
        const personaExistente = await prisma.persona.findUnique({
            where: { DNI: DNI_Jugador },
        });

        if (!personaExistente) {
            return res.status(404).json({ error: 'El DNI proporcionado no está registrado en la tabla Persona.' });
        }

        // Verificar si el jugador ya existe
        const jugadorExistente = await prisma.jugador.findUnique({
            where: {
                DNI_Jugador_Nro_Socio: {
                    DNI_Jugador,
                    Nro_Socio,
                },
            },
        });

        if (jugadorExistente) {
            return res.status(409).json({ error: 'El jugador ya está registrado.' });
        }

        // Verificar que el equipo exista si se proporciona Nro_Equipo
        if (Nro_Equipo) {
            const equipoExistente = await prisma.equipo.findUnique({
                where: { Nro_Equipo },
            });

            if (!equipoExistente) {
                return res.status(404).json({ error: 'El equipo especificado no existe.' });
            }
        }

        // Crear el jugador en la base de datos
        const nuevoJugador = await prisma.jugador.create({
            data: {
                DNI_Jugador,
                Nro_Socio,
                Nro_Equipo,
                Telefono,
            },
        });

        // Responder con el jugador creado
        res.status(201).json(nuevoJugador);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al registrar el jugador.' });
    }
});

// trae todas las personas
router.get('/personas', async (req, res) => {
  try {

      const personas = await prisma.persona.findMany();
      return res.status(200).json(personas); 

  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener las personas" });
  }
});

// trae todos los jugadores
router.get('/jugadores', async (req, res) => {
  try {

      const jugadores = await prisma.persona.findMany(
        {
          where: {
            Rol: 'Jugador'
          }
        }
      );
      return res.status(200).json(jugadores); 

  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener los jugadores" });
  }
});

// trae todos los arbitros
router.get('/arbitros', async (req, res) => {
  try {

      const jugadores = await prisma.persona.findMany(
        {
          where: {
            Rol: 'Arbitro',
          }
        }
      );
      return res.status(200).json(jugadores); 

  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener los arbitros" });
  }
});

export default router