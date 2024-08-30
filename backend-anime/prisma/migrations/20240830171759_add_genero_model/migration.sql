/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `sinopsis` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Anime` table. All the data in the column will be lost.
  - The primary key for the `AnimeGenero` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AnimeGenero` table. All the data in the column will be lost.
  - Added the required column `ano` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capitulos` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagen` to the `Anime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "createdAt",
DROP COLUMN "sinopsis",
DROP COLUMN "updatedAt",
ADD COLUMN     "ano" INTEGER NOT NULL,
ADD COLUMN     "capitulos" INTEGER NOT NULL,
ADD COLUMN     "imagen" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AnimeGenero" DROP CONSTRAINT "AnimeGenero_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "AnimeGenero_pkey" PRIMARY KEY ("animeId", "generoId");
