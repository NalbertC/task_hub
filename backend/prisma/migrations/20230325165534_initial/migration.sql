-- CreateTable
CREATE TABLE "tarefa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "momento" DATETIME NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualido_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "dia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualido_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "dia_tarefa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dia_id" INTEGER NOT NULL,
    "tarefa_id" INTEGER NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualido_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "dia_tarefa_dia_id_fkey" FOREIGN KEY ("dia_id") REFERENCES "dia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "dia_tarefa_tarefa_id_fkey" FOREIGN KEY ("tarefa_id") REFERENCES "tarefa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tarefa_dia_semana" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tarefa_id" INTEGER NOT NULL,
    "dia_semana" INTEGER NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualido_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tarefa_dia_semana_tarefa_id_fkey" FOREIGN KEY ("tarefa_id") REFERENCES "tarefa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "dia_data_key" ON "dia"("data");

-- CreateIndex
CREATE UNIQUE INDEX "dia_tarefa_dia_id_tarefa_id_key" ON "dia_tarefa"("dia_id", "tarefa_id");

-- CreateIndex
CREATE UNIQUE INDEX "tarefa_dia_semana_tarefa_id_dia_semana_key" ON "tarefa_dia_semana"("tarefa_id", "dia_semana");
