import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router()
const prisma = new PrismaClient()

router.post('/categoria', async (req, res) => {
    try {
        const { Tipo, Edad_Min, Edad_Max, Descripcion } = req.body;
    
        if (validationError) {
          return handleError(validationError, 400);
        }

        if (!Tipo || typeof Edad_Min !== 'number' || typeof Edad_Max !== 'number') {
            return res.status(400).json({error: "Faltan campos obligatorios"});
          }
          if (Edad_Max <= Edad_Min || Edad_Max === Edad_Min) {
            return res.status(400).json({error: "Datos de edad incorrectos"});
          }
    
        const nuevaCategoria = await prisma.categoria.create({
          Tipo,
          Edad_Min,
          Edad_Max,
          Descripcion
        });
    
      } catch (error) {
        return res.status(500).json({error: "Error al crear una categoría"})
      }
})

router.get('/categoria', async (req, res) => {
    try {
        const { Tipo } = req.body;// Obtenemos el parámetro "nombre" desde la URL
        
        // Si se proporciona un nombre, buscar una categoría específica
        if (Tipo) {
          const categoria = await prisma.categoria.findUnique({
            where: { Tipo },
          });
    
          if (!categoria) {
            return handleError(`No se encontró una categoría con el nombre "${Tipo}"`, 404);
          }
    
          return NextResponse.json(categoria); // Devuelve la categoría encontrada
        }
    
        // Si no se proporciona nombre, devolver todas las categorías
        const categorias = await prisma.categoria.findMany();
    
        return NextResponse.json(categorias); // Devuelve todas las categorías
      } catch (error) {
        return handleError('Error al obtener las categorías', 500);
      }
})
  

router.delete('categoria/:id',async (req, res) => {
    try {
      const categoria = await prisma.categoria.findUnique(req.params.Categoria_ID);
      const nombre = categoria.Tipo;
  
      if (!nombre) {
        return res.status(404).json({error: "Categoría no encontrada"});
      }
  
      await prisma.categoria.delete({
        where: { nombre },
      });
  
      return NextResponse.json(
        { message: `Categoría con nombre "${nombre}" eliminada exitosamente` },
        { status: 200 }
      );
    } catch {
        return res.status(500).json({error: "Error al eliminar la categoría"});
    }
  })

export default router