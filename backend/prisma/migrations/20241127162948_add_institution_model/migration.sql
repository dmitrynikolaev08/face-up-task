-- CreateTable
CREATE TABLE "institutions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reports" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "senderName" TEXT NOT NULL,
    "senderAge" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "files" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "reports_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institutions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_reports" ("createdAt", "files", "id", "institutionId", "message", "senderAge", "senderName", "updatedAt") SELECT "createdAt", "files", "id", "institutionId", "message", "senderAge", "senderName", "updatedAt" FROM "reports";
DROP TABLE "reports";
ALTER TABLE "new_reports" RENAME TO "reports";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
