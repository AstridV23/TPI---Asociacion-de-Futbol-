-- CreateTable
CREATE TABLE "Categoria" (
    "Categoria_Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Tipo" TEXT,
    "Descripcion" TEXT
);

-- CreateTable
CREATE TABLE "Division" (
    "Division_Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Tipo" TEXT
);

-- CreateTable
CREATE TABLE "Persona" (
    "DNI" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FechaNacimiento" TEXT,
    "Direccion" TEXT,
    "Apellido" TEXT NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Rol" TEXT NOT NULL,
    "Contrasena" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Torneo" (
    "Torneo_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Categoria_Id" INTEGER NOT NULL,
    "Division_Id" INTEGER NOT NULL,
    "DNI_Encargado" INTEGER NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Fecha_Inicio" TEXT NOT NULL,
    "Fecha_Fin" TEXT NOT NULL,
    "Fecha_Inicio_Inscripcion" TEXT NOT NULL,
    "Fecha_Fin_Inscripcion" TEXT NOT NULL,
    CONSTRAINT "Torneo_Categoria_Id_fkey" FOREIGN KEY ("Categoria_Id") REFERENCES "Categoria" ("Categoria_Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Torneo_Division_Id_fkey" FOREIGN KEY ("Division_Id") REFERENCES "Division" ("Division_Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Torneo_DNI_Encargado_fkey" FOREIGN KEY ("DNI_Encargado") REFERENCES "Persona" ("DNI") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equipo" (
    "Nro_Equipo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nombre" TEXT,
    "DT" TEXT,
    "Division_Id" INTEGER,
    "DNI_Representante" INTEGER,
    "Categoria_Id" INTEGER,
    CONSTRAINT "Equipo_Division_Id_fkey" FOREIGN KEY ("Division_Id") REFERENCES "Division" ("Division_Id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Equipo_Categoria_Id_fkey" FOREIGN KEY ("Categoria_Id") REFERENCES "Categoria" ("Categoria_Id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Equipo_DNI_Representante_fkey" FOREIGN KEY ("DNI_Representante") REFERENCES "Persona" ("DNI") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Jugador" (
    "DNI_Jugador" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nro_Socio" INTEGER,
    "Nro_Equipo" INTEGER,
    "Telefono" TEXT,
    "Foto" BLOB,
    CONSTRAINT "Jugador_Nro_Equipo_fkey" FOREIGN KEY ("Nro_Equipo") REFERENCES "Equipo" ("Nro_Equipo") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Arbitro" (
    "DNI_Arbitro" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TieneCertificacion" BOOLEAN NOT NULL,
    "NivelExperiencia" INTEGER
);

-- CreateTable
CREATE TABLE "Cancha" (
    "Cancha_Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Direccion" TEXT,
    "Nombre" TEXT
);

-- CreateTable
CREATE TABLE "Fixture" (
    "Fixture_Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Cantidad_Ruedas" INTEGER
);

-- CreateTable
CREATE TABLE "Encuentro" (
    "Encuentro_Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DNI_Arbitro" INTEGER,
    "Cancha_Id" INTEGER,
    "Fecha" TEXT NOT NULL,
    "Hora" TEXT NOT NULL,
    CONSTRAINT "Encuentro_DNI_Arbitro_fkey" FOREIGN KEY ("DNI_Arbitro") REFERENCES "Arbitro" ("DNI_Arbitro") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Encuentro_Cancha_Id_fkey" FOREIGN KEY ("Cancha_Id") REFERENCES "Cancha" ("Cancha_Id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tiene_Torneo_Division" (
    "Torneo_ID" INTEGER NOT NULL,
    "Division_Id" INTEGER NOT NULL,

    PRIMARY KEY ("Torneo_ID", "Division_Id"),
    CONSTRAINT "Tiene_Torneo_Division_Torneo_ID_fkey" FOREIGN KEY ("Torneo_ID") REFERENCES "Torneo" ("Torneo_ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tiene_Torneo_Division_Division_Id_fkey" FOREIGN KEY ("Division_Id") REFERENCES "Division" ("Division_Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tiene_Torneo_Categoria" (
    "Torneo_ID" INTEGER NOT NULL,
    "Categoria_Id" INTEGER NOT NULL,

    PRIMARY KEY ("Torneo_ID", "Categoria_Id"),
    CONSTRAINT "Tiene_Torneo_Categoria_Torneo_ID_fkey" FOREIGN KEY ("Torneo_ID") REFERENCES "Torneo" ("Torneo_ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tiene_Torneo_Categoria_Categoria_Id_fkey" FOREIGN KEY ("Categoria_Id") REFERENCES "Categoria" ("Categoria_Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rueda" (
    "Nro_Rueda" INTEGER NOT NULL,
    "Fixture_Id" INTEGER NOT NULL,

    PRIMARY KEY ("Nro_Rueda", "Fixture_Id"),
    CONSTRAINT "Rueda_Fixture_Id_fkey" FOREIGN KEY ("Fixture_Id") REFERENCES "Fixture" ("Fixture_Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Se_Compone" (
    "Torneo_ID" INTEGER NOT NULL,
    "Fixture_Id" INTEGER NOT NULL,
    "Encuentro_Id" INTEGER NOT NULL,

    PRIMARY KEY ("Torneo_ID", "Fixture_Id", "Encuentro_Id"),
    CONSTRAINT "Se_Compone_Torneo_ID_fkey" FOREIGN KEY ("Torneo_ID") REFERENCES "Torneo" ("Torneo_ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Se_Compone_Fixture_Id_fkey" FOREIGN KEY ("Fixture_Id") REFERENCES "Fixture" ("Fixture_Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Se_Compone_Encuentro_Id_fkey" FOREIGN KEY ("Encuentro_Id") REFERENCES "Encuentro" ("Encuentro_Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Juega" (
    "DNI_Jugador" INTEGER NOT NULL,
    "Nro_Equipo" INTEGER NOT NULL,
    "Encuentro_Id" INTEGER NOT NULL,

    PRIMARY KEY ("DNI_Jugador", "Nro_Equipo", "Encuentro_Id"),
    CONSTRAINT "Juega_DNI_Jugador_fkey" FOREIGN KEY ("DNI_Jugador") REFERENCES "Jugador" ("DNI_Jugador") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Juega_Nro_Equipo_fkey" FOREIGN KEY ("Nro_Equipo") REFERENCES "Equipo" ("Nro_Equipo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Juega_Encuentro_Id_fkey" FOREIGN KEY ("Encuentro_Id") REFERENCES "Encuentro" ("Encuentro_Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pertenece" (
    "DNI_Jugador" INTEGER NOT NULL,
    "Nro_Equipo" INTEGER NOT NULL,

    PRIMARY KEY ("DNI_Jugador", "Nro_Equipo"),
    CONSTRAINT "Pertenece_DNI_Jugador_fkey" FOREIGN KEY ("DNI_Jugador") REFERENCES "Jugador" ("DNI_Jugador") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pertenece_Nro_Equipo_fkey" FOREIGN KEY ("Nro_Equipo") REFERENCES "Equipo" ("Nro_Equipo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "jugador_hace" (
    "DNI_Jugador" INTEGER NOT NULL,
    "Encuentro_Id" INTEGER NOT NULL,
    "Nro_Equipo" INTEGER NOT NULL,
    "gol" BOOLEAN NOT NULL,
    "momento" TEXT,

    PRIMARY KEY ("DNI_Jugador", "Encuentro_Id", "Nro_Equipo"),
    CONSTRAINT "jugador_hace_DNI_Jugador_fkey" FOREIGN KEY ("DNI_Jugador") REFERENCES "Jugador" ("DNI_Jugador") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "jugador_hace_Encuentro_Id_fkey" FOREIGN KEY ("Encuentro_Id") REFERENCES "Encuentro" ("Encuentro_Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "jugador_hace_Nro_Equipo_fkey" FOREIGN KEY ("Nro_Equipo") REFERENCES "Equipo" ("Nro_Equipo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Infraccion" (
    "Infraccion_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Encuentro_Id" INTEGER NOT NULL,
    "Minuto" INTEGER NOT NULL,
    "Tipo" TEXT NOT NULL,
    "DNI_Jugador" INTEGER NOT NULL,
    "DNI_Arbitro" INTEGER NOT NULL,
    CONSTRAINT "Infraccion_Encuentro_Id_fkey" FOREIGN KEY ("Encuentro_Id") REFERENCES "Encuentro" ("Encuentro_Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Infraccion_DNI_Jugador_fkey" FOREIGN KEY ("DNI_Jugador") REFERENCES "Jugador" ("DNI_Jugador") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Infraccion_DNI_Arbitro_fkey" FOREIGN KEY ("DNI_Arbitro") REFERENCES "Arbitro" ("DNI_Arbitro") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Categoria_Categoria_Id_idx" ON "Categoria"("Categoria_Id");
