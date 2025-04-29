/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Professor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Professor` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `courseId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `helpfulness` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `Review` table. All the data in the column will be lost.
  - Added the required column `departmentId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseInstanceId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workLoad` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CourseAlias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alias" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "CourseAlias_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CourseInstance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    CONSTRAINT "CourseInstance_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CourseInstance_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    CONSTRAINT "Course_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("code", "id", "name") SELECT "code", "id", "name" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");
CREATE TABLE "new_Professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Professor" ("id", "name") SELECT "id", "name" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
CREATE UNIQUE INDEX "Professor_name_key" ON "Professor"("name");
CREATE TABLE "new_Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clarity" INTEGER NOT NULL,
    "knowledge" INTEGER NOT NULL,
    "workLoad" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "overall" INTEGER NOT NULL,
    "approximateMedian" INTEGER,
    "comment" TEXT,
    "courseInstanceId" INTEGER NOT NULL,
    CONSTRAINT "Review_courseInstanceId_fkey" FOREIGN KEY ("courseInstanceId") REFERENCES "CourseInstance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("approximateMedian", "clarity", "comment", "createdAt", "difficulty", "id", "knowledge", "overall") SELECT "approximateMedian", "clarity", "comment", "createdAt", "difficulty", "id", "knowledge", "overall" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE INDEX "Review_courseInstanceId_idx" ON "Review"("courseInstanceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CourseAlias_courseId_alias_key" ON "CourseAlias"("courseId", "alias");

-- CreateIndex
CREATE INDEX "CourseInstance_year_semester_idx" ON "CourseInstance"("year", "semester");

-- CreateIndex
CREATE UNIQUE INDEX "CourseInstance_courseId_year_semester_key" ON "CourseInstance"("courseId", "year", "semester");
