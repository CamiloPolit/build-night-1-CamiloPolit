/*
  Warnings:

  - You are about to drop the column `slug` on the `Career` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Career" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Career" ("description", "id", "name") SELECT "description", "id", "name" FROM "Career";
DROP TABLE "Career";
ALTER TABLE "new_Career" RENAME TO "Career";
CREATE UNIQUE INDEX "Career_name_key" ON "Career"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
