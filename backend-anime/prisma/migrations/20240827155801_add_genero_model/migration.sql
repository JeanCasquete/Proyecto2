/*
  Warnings:

  - You are about to drop the column `ano` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `capitulos` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `imagen` on the `Anime` table. All the data in the column will be lost.
  - The primary key for the `AnimeGenero` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `Anime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "ano",
DROP COLUMN "capitulos",
DROP COLUMN "imagen",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sinopsis" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "AnimeGenero" DROP CONSTRAINT "AnimeGenero_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "AnimeGenero_pkey" PRIMARY KEY ("id");
