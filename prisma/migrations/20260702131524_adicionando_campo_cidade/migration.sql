/*
  Warnings:

  - Added the required column `cidade` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "cidade" TEXT NOT NULL;
