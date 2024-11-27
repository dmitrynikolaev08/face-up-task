/*
  Warnings:

  - Added the required column `updatedAt` to the `institutions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_institutions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_institutions" ("id", "name") SELECT "id", "name" FROM "institutions";
DROP TABLE "institutions";
ALTER TABLE "new_institutions" RENAME TO "institutions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
