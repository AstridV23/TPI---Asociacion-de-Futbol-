import { Router } from "express";
import bcrypt from 'bcryptjs'
import { PrismaClient } from "@prisma/client";
import { createAccessToken } from "../libs/jwt.js";
import dotenv from 'dotenv'

const router = Router()
const prisma = new PrismaClient()

dotenv.config()

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


  /*router.get('/perfil', verifyToken, async (req, res) => {
    try {
      // Accede al usuario desde req.usuario que fue añadido por el middleware
      const usuario = await prisma.persona.findUnique({
        where: { id: req.usuario.id },
        select: {
          id: true,
          DNI: true,
          Nombre: true,
          Apellido: true,
          Rol: true
        }
      });
  
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el perfil' });
    }
  });*/

export default router