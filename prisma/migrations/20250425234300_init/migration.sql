-- CreateTable
CREATE TABLE "Professor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clarity" INTEGER NOT NULL,
    "knowledge" INTEGER NOT NULL,
    "helpfulness" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "overall" INTEGER NOT NULL,
    "approximateMedian" INTEGER,
    "comment" TEXT,
    "semester" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    CONSTRAINT "Review_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
