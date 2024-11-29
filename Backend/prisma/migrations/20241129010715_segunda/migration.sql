/*
  Warnings:

  - Added the required column `Asistencia` to the `Juega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Cantidad_Goles_Del_Equipo` to the `Juega` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Juega" (
    "DNI_Jugador" INTEGER NOT NULL,
    "Nro_Equipo" INTEGER NOT NULL,
    "Encuentro_Id" INTEGER NOT NULL,
    "Cantidad_Goles_Del_Equipo" INTEGER NOT NULL,
    "Asistencia" INTEGER NOT NULL,

    PRIMARY KEY ("DNI_Jugador", "Nro_Equipo", "Encuentro_Id"),
    CONSTRAINT "Juega_DNI_Jugador_fkey" FOREIGN KEY ("DNI_Jugador") REFERENCES "Jugador" ("DNI_Jugador") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Juega_Nro_Equipo_fkey" FOREIGN KEY ("Nro_Equipo") REFERENCES "Equipo" ("Nro_Equipo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Juega_Encuentro_Id_fkey" FOREIGN KEY ("Encuentro_Id") REFERENCES "Encuentro" ("Encuentro_Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Juega" ("DNI_Jugador", "Encuentro_Id", "Nro_Equipo") SELECT "DNI_Jugador", "Encuentro_Id", "Nro_Equipo" FROM "Juega";
DROP TABLE "Juega";
ALTER TABLE "new_Juega" RENAME TO "Juega";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
