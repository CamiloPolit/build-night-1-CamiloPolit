-- CreateTable
CREATE TABLE "Career" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "CurriculumEntry" (
    "careerId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,

    PRIMARY KEY ("careerId", "courseId"),
    CONSTRAINT "CurriculumEntry_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CurriculumEntry_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Career_slug_key" ON "Career"("slug");

-- CreateIndex
CREATE INDEX "CurriculumEntry_careerId_semester_idx" ON "CurriculumEntry"("careerId", "semester");
