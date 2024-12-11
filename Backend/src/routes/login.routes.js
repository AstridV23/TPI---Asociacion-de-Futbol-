import { Router } from "express";
import bcrypt from 'bcryptjs'
import { PrismaClient } from "@prisma/client";
import { createAccessToken } from "../libs/jwt.js";
import dotenv from 'dotenv'

const router = Router()
const prisma = new PrismaClient()

dotenv.config()

// busca al usuario registrado
router.post('/login', async (req, res) => {
    try {
      const { DNI, Contrasena } = req.body;
  
      // Validación básica de campos requeridos
      if (!DNI || !Contrasena) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }

      const usuarioExistente = await prisma.persona.findUnique({
        where: { DNI }
      });

      if (!usuarioExistente) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
      }

      const passwordMatch = await bcrypt.compare(Contrasena, usuarioExistente.Contrasena);

      if(!passwordMatch) return res.status(400).json({message: "Correo o contraseña incorrectos."})

      const token = await createAccessToken(usuarioExistente)
      
      res.cookie('token', token)

      res.json({ 
        DNI: usuarioExistente.DNI,
        FechaNacimiento: usuarioExistente.FechaNacimiento,
        Direccion: usuarioExistente.Direccion,
        Apellido: usuarioExistente.Apellido,
        Nombre: usuarioExistente.Nombre,
        Rol: usuarioExistente.Rol,
      });
    } 
    catch (error) {
      console.error('Error al registrar usuario:', error);
      
      // Manejo de errores específicos de Prisma
      if (error.code === 'P2002') {
        return res.status(409).json({ error: 'Ya existe un usuario con este DNI' });
      }
  
      res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router