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
      const { DNI, FechaNacimiento, Direccion, Apellido, Nombre, Rol, Contrasena } = req.body;
  
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
router.post('/register_jugador', async (req, res) => {

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