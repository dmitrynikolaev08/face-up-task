/*
  Warnings:

  - You are about to drop the column `createdAt` on the `institutions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `institutions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_institutions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_institutions" ("id", "name") SELECT "id", "name" FROM "institutions";
DROP TABLE "institutions";
ALTER TABLE "new_institutions" RENAME TO "institutions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
