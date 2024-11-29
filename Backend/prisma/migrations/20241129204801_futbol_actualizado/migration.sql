/*
  Warnings:

  - A unique constraint covering the columns `[Nombre]` on the table `Torneo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Edad_Max` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Edad_Min` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Categoria" (
    "Categoria_Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Tipo" TEXT,
    "Descripcion" TEXT,
    "Edad_Min" INTEGER NOT NULL,
    "Edad_Max" INTEGER NOT NULL
);
INSERT INTO "new_Categoria" ("Categoria_Id", "Descripcion", "Tipo") SELECT "Categoria_Id", "Descripcion", "Tipo" FROM "Categoria";
DROP TABLE "Categoria";
ALTER TABLE "new_Categoria" RENAME TO "Categoria";
CREATE INDEX "Categoria_Categoria_Id_idx" ON "Categoria"("Categoria_Id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Torneo_Nombre_key" ON "Torneo"("Nombre");
