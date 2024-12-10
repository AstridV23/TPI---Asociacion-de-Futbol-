/*
  Warnings:

  - You are about to drop the `Fixture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pertenece` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Se_Compone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tiene_Torneo_Categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tiene_Torneo_Division` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jugador_hace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `TieneCertificacion` on the `Arbitro` table. The data in that column could be lost. The data in that column will be cast from `Boolean` to `Int`.
  - You are about to drop the column `Edad_Max` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `Edad_Min` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `Fecha` on the `Encuentro` table. All the data in the column will be lost.
  - You are about to drop the column `Minuto` on the `Infraccion` table. All the data in the column will be lost.
  - The primary key for the `Juega` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Asistencia` on the `Juega` table. All the data in the column will be lost.
  - You are about to drop the column `Cantidad_Goles_Del_Equipo` on the `Juega` table. All the data in the column will be lost.
  - The primary key for the `Jugador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Rueda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Fixture_Id` on the `Rueda` table. All the data in the column will be lost.
  - Made the column `NivelExperiencia` on table `Arbitro` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Direccion` on table `Cancha` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Nombre` on table `Cancha` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `Max_Edad` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Min_Edad` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Made the column `Descripcion` on table `Categoria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Tipo` on table `Categoria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Tipo` on table `Division` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `Fecha_id` to the `Encuentro` table without a default value. This is not possible if the table is not empty.
  - Made the column `Cancha_Id` on table `Encuentro` required. This step will fail if there are existing NULL values in that column.
  - Made the column `DNI_Arbitro` on table `Encuentro` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Categoria_Id` on table `Equipo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `DNI_Representante` on table `Equipo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `DT` on table `Equipo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Division_Id` on table `Equipo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Nombre` on table `Equipo` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `Momento` to the `Infraccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Nro_Socio` to the `Infraccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Nro_Socio` to the `Juega` table without a default value. This is not possible if the table is not empty.
  - Made the column `Nro_Socio` on table `Jugador` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Telefono` on table `Jugador` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `Email` to the `Persona` table without a default value. This is not possible if the table is not empty.
  - Made the column `Direccion` on table `Persona` required. This step will fail if there are existing NULL values in that column.
  - Made the column `FechaNacimiento` on table `Persona` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `Rueda_id` to the `Rueda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Torneo_id` to the `Rueda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Cant_ruedas` to the `Torneo` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Fixture";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pertenece";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Se_Compone";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tiene_Torneo_Categoria";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tiene_Torneo_Division";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "jugador_hace";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Fecha_Torneo" (
    "Fecha_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nro_fecha" INTEGER NOT NULL,
    "Date" TEXT NOT NULL,
    "Rueda_id" INTEGER NOT NULL,
    CONSTRAINT "Fecha_Torneo_Rueda_id_fkey" FOREIGN KEY ("Rueda_id") REFERENCES "Rueda" ("Rueda_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Hace_Gol" (
    "DNI_Jugador" INTEGER NOT NULL,
    "Nro_Socio" INTEGER NOT NULL,
    "Encuentro_Id" INTEGER NOT NULL,
    "Momento" TEXT NOT NULL,

    PRIMARY KEY ("DNI_Jugador", "Nro_Socio", "Encuentro_Id"),
    CONSTRAINT "Hace_Gol_DNI_Jugador_Nro_Socio_fkey" FOREIGN KEY ("DNI_Jugador", "Nro_Socio") REFERENCES "Jugador" ("DNI_Jugador", "Nro_Socio") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Hace_Gol_Encuentro_Id_fkey" FOREIGN KEY ("Encuentro_Id") REFERENCES "Encuentro" ("Encuentro_Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Participa" (
    "Torneo_id" INTEGER NOT NULL,
    "Nro_Equipo" INTEGER NOT NULL,
    "Puntos" INTEGER NOT NULL,

    PRIMARY KEY ("Torneo_id", "Nro_Equipo"),
    CONSTRAINT "Participa_Torneo_id_fkey" FOREIGN KEY ("Torneo_id") REFERENCES "Torneo" ("Torneo_ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Participa_Nro_Equipo_fkey" FOREIGN KEY ("Nro_Equipo") REFERENCES "Equipo" ("Nro_Equipo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Arbitro" (
    "DNI_Arbitro" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TieneCertificacion" INTEGER NOT NULL,
    "NivelExperiencia" INTEGER NOT NULL
);
INSERT INTO "new_Arbitro" ("DNI_Arbitro", "NivelExperiencia", "TieneCertificacion") SELECT "DNI_Arbitro", "NivelExperiencia", "TieneCertificacion" FROM "Arbitro";
DROP TABLE "Arbitro";
ALTER TABLE "new_Arbitro" RENAME TO "Arbitro";
CREATE TABLE "new_Cancha" (
    "Cancha_Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Direccion" TEXT NOT NULL,
    "Nombre" TEXT NOT NULL
);
INSERT INTO "new_Cancha" ("Cancha_Id", "Direccion", "Nombre") SELECT "Cancha_Id", "Direccion", "Nombre" FROM "Cancha";
DROP TABLE "Cancha";
ALTER TABLE "new_Cancha" RENAME TO "Cancha";
CREATE TABLE "new_Categoria" (
    "Categoria_Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Tipo" TEXT NOT NULL,
    "Descripcion" TEXT NOT NULL,
    "Min_Edad" INTEGER NOT NULL,
    "Max_Edad" INTEGER NOT NULL
);
INSERT INTO "new_Categoria" ("Categoria_Id", "Descripcion", "Tipo") SELECT "Categoria_Id", "Descripcion", "Tipo" FROM "Categoria";
DROP TABLE "Categoria";
ALTER TABLE "new_Categoria" RENAME TO "Categoria";
CREATE TABLE "new_Division" (
    "Division_Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Tipo" TEXT NOT NULL
);
INSERT INTO "new_Division" ("Division_Id", "Tipo") SELECT "Division_Id", "Tipo" FROM "Division";
DROP TABLE "Division";
ALTER TABLE "new_Division" RENAME TO "Division";
CREATE TABLE "new_Encuentro" (
    "Encuentro_Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DNI_Arbitro" INTEGER NOT NULL,
    "Cancha_Id" INTEGER NOT NULL,
    "Hora" TEXT NOT NULL,
    "Fecha_id" INTEGER NOT NULL,
    CONSTRAINT "Encuentro_DNI_Arbitro_fkey" FOREIGN KEY ("DNI_Arbitro") REFERENCES "Arbitro" ("DNI_Arbitro") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Encuentro_Cancha_Id_fkey" FOREIGN KEY ("Cancha_Id") REFERENCES "Cancha" ("Cancha_Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Encuentro_Fecha_id_fkey" FOREIGN KEY ("Fecha_id") REFERENCES "Fecha_Torneo" ("Fecha_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Encuentro" ("Cancha_Id", "DNI_Arbitro", "Encuentro_Id", "Hora") SELECT "Cancha_Id", "DNI_Arbitro", "Encuentro_Id", "Hora" FROM "Encuentro";
DROP TABLE "Encuentro";
ALTER TABLE "new_Encuentro" RENAME TO "Encuentro";
CREATE TABLE "new_Equipo" (
    "Nro_Equipo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nombre" TEXT NOT NULL,
    "DT" TEXT NOT NULL,
    "Division_Id" INTEGER NOT NULL,
    "DNI_Representante" INTEGER NOT NULL,
    "Categoria_Id" INTEGER NOT NULL,
    CONSTRAINT "Equipo_Division_Id_fkey" FOREIGN KEY ("Division_Id") REFERENCES "Division" ("Division_Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Equipo_DNI_Representante_fkey" FOREIGN KEY ("DNI_Representante") REFERENCES "Persona" ("DNI") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Equipo_Categoria_Id_fkey" FOREIGN KEY ("Categoria_Id") REFERENCES "Categoria" ("Categoria_Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Equipo" ("Categoria_Id", "DNI_Representante", "DT", "Division_Id", "Nombre", "Nro_Equipo") SELECT "Categoria_Id", "DNI_Representante", "DT", "Division_Id", "Nombre", "Nro_Equipo" FROM "Equipo";
DROP TABLE "Equipo";
ALTER TABLE "new_Equipo" RENAME TO "Equipo";
CREATE TABLE "new_Infraccion" (
    "Infraccion_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Encuentro_Id" INTEGER NOT NULL,
    "Momento" INTEGER NOT NULL,
    "Tipo" TEXT NOT NULL,
    "DNI_Jugador" INTEGER NOT NULL,
    "Nro_Socio" INTEGER NOT NULL,
    "DNI_Arbitro" INTEGER NOT NULL,
    CONSTRAINT "Infraccion_Encuentro_Id_fkey" FOREIGN KEY ("Encuentro_Id") REFERENCES "Encuentro" ("Encuentro_Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Infraccion_DNI_Jugador_Nro_Socio_fkey" FOREIGN KEY ("DNI_Jugador", "Nro_Socio") REFERENCES "Jugador" ("DNI_Jugador", "Nro_Socio") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Infraccion_DNI_Arbitro_fkey" FOREIGN KEY ("DNI_Arbitro") REFERENCES "Arbitro" ("DNI_Arbitro") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Infraccion" ("DNI_Arbitro", "DNI_Jugador", "Encuentro_Id", "Infraccion_id", "Tipo") SELECT "DNI_Arbitro", "DNI_Jugador", "Encuentro_Id", "Infraccion_id", "Tipo" FROM "Infraccion";
DROP TABLE "Infraccion";
ALTER TABLE "new_Infraccion" RENAME TO "Infraccion";
CREATE TABLE "new_Juega" (
    "Nro_Equipo" INTEGER NOT NULL,
    "Encuentro_Id" INTEGER NOT NULL,
    "DNI_Jugador" INTEGER NOT NULL,
    "Nro_Socio" INTEGER NOT NULL,

    PRIMARY KEY ("Nro_Equipo", "Encuentro_Id", "DNI_Jugador", "Nro_Socio"),
    CONSTRAINT "Juega_Nro_Equipo_fkey" FOREIGN KEY ("Nro_Equipo") REFERENCES "Equipo" ("Nro_Equipo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Juega_Encuentro_Id_fkey" FOREIGN KEY ("Encuentro_Id") REFERENCES "Encuentro" ("Encuentro_Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Juega_DNI_Jugador_Nro_Socio_fkey" FOREIGN KEY ("DNI_Jugador", "Nro_Socio") REFERENCES "Jugador" ("DNI_Jugador", "Nro_Socio") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Juega" ("DNI_Jugador", "Encuentro_Id", "Nro_Equipo") SELECT "DNI_Jugador", "Encuentro_Id", "Nro_Equipo" FROM "Juega";
DROP TABLE "Juega";
ALTER TABLE "new_Juega" RENAME TO "Juega";
CREATE TABLE "new_Jugador" (
    "DNI_Jugador" INTEGER NOT NULL,
    "Nro_Socio" INTEGER NOT NULL,
    "Nro_Equipo" INTEGER,
    "Telefono" TEXT NOT NULL,
    "Foto" BLOB,

    PRIMARY KEY ("DNI_Jugador", "Nro_Socio"),
    CONSTRAINT "Jugador_Nro_Equipo_fkey" FOREIGN KEY ("Nro_Equipo") REFERENCES "Equipo" ("Nro_Equipo") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Jugador_DNI_Jugador_fkey" FOREIGN KEY ("DNI_Jugador") REFERENCES "Persona" ("DNI") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Jugador" ("DNI_Jugador", "Foto", "Nro_Equipo", "Nro_Socio", "Telefono") SELECT "DNI_Jugador", "Foto", "Nro_Equipo", "Nro_Socio", "Telefono" FROM "Jugador";
DROP TABLE "Jugador";
ALTER TABLE "new_Jugador" RENAME TO "Jugador";
CREATE TABLE "new_Persona" (
    "DNI" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FechaNacimiento" TEXT NOT NULL,
    "Direccion" TEXT NOT NULL,
    "Apellido" TEXT NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Rol" TEXT,
    "Contrasena" TEXT NOT NULL,
    "Email" TEXT NOT NULL
);
INSERT INTO "new_Persona" ("Apellido", "Contrasena", "DNI", "Direccion", "FechaNacimiento", "Nombre", "Rol") SELECT "Apellido", "Contrasena", "DNI", "Direccion", "FechaNacimiento", "Nombre", "Rol" FROM "Persona";
DROP TABLE "Persona";
ALTER TABLE "new_Persona" RENAME TO "Persona";
CREATE TABLE "new_Rueda" (
    "Rueda_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Torneo_id" INTEGER NOT NULL,
    "Nro_Rueda" INTEGER NOT NULL,
    CONSTRAINT "Rueda_Torneo_id_fkey" FOREIGN KEY ("Torneo_id") REFERENCES "Torneo" ("Torneo_ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rueda" ("Nro_Rueda") SELECT "Nro_Rueda" FROM "Rueda";
DROP TABLE "Rueda";
ALTER TABLE "new_Rueda" RENAME TO "Rueda";
CREATE TABLE "new_Torneo" (
    "Torneo_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Categoria_Id" INTEGER NOT NULL,
    "Division_Id" INTEGER NOT NULL,
    "DNI_Encargado" INTEGER NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Fecha_Inicio" TEXT NOT NULL,
    "Fecha_Fin" TEXT NOT NULL,
    "Fecha_Inicio_Inscripcion" TEXT NOT NULL,
    "Fecha_Fin_Inscripcion" TEXT NOT NULL,
    "Cant_ruedas" INTEGER NOT NULL,
    CONSTRAINT "Torneo_Categoria_Id_fkey" FOREIGN KEY ("Categoria_Id") REFERENCES "Categoria" ("Categoria_Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Torneo_Division_Id_fkey" FOREIGN KEY ("Division_Id") REFERENCES "Division" ("Division_Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Torneo_DNI_Encargado_fkey" FOREIGN KEY ("DNI_Encargado") REFERENCES "Persona" ("DNI") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Torneo" ("Categoria_Id", "DNI_Encargado", "Division_Id", "Fecha_Fin", "Fecha_Fin_Inscripcion", "Fecha_Inicio", "Fecha_Inicio_Inscripcion", "Nombre", "Torneo_ID") SELECT "Categoria_Id", "DNI_Encargado", "Division_Id", "Fecha_Fin", "Fecha_Fin_Inscripcion", "Fecha_Inicio", "Fecha_Inicio_Inscripcion", "Nombre", "Torneo_ID" FROM "Torneo";
DROP TABLE "Torneo";
ALTER TABLE "new_Torneo" RENAME TO "Torneo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
