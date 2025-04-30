const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const departments = require("../src/data/departments.json");
const careerPrograms = require("../src/data/careers/career_programs.json");

const prisma = new PrismaClient();

// Function to extract year and semester from catalog filename
function extractYearSemester(filename) {
  // Filename format: YYYYS_catalog.json (e.g., 20211_catalog.json)
  const match = filename.match(/^(\d{4})(\d)_catalog\.json$/);
  if (!match) {
    throw new Error(`Invalid catalog filename format: ${filename}`);
  }
  return {
    year: parseInt(match[1]),
    semester: parseInt(match[2]),
  };
}

// Function to convert Roman numeral to integer
function romanToInt(roman) {
  if (!roman) return null;

  const values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;
  let prev = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const current = values[roman[i]];
    if (current < prev) {
      result -= current;
    } else {
      result += current;
    }
    prev = current;
  }

  return result;
}

async function main() {
  console.log("Cleaning database...");

  // Add CurriculumEntry and Career to the deletion cascade
  await prisma.curriculumEntry.deleteMany({});
  await prisma.career.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.courseInstance.deleteMany({});
  await prisma.courseAlias.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.professor.deleteMany({});
  await prisma.department.deleteMany({});

  console.log("Database cleaned.");

  console.log("Starting database seeding...");

  // 1. Seed Departments
  console.log("Seeding departments...");
  const departmentEntries = Object.entries(departments);
  const departmentMap = new Map();

  for (const [key, name] of departmentEntries) {
    const department = await prisma.department.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    departmentMap.set(key, department.id);
  }

  console.log(`Seeded ${departmentEntries.length} departments successfully`);

  // 2. Get all catalog files
  const catalogDir = path.join(__dirname, "../src/data/catalog");
  const catalogFiles = fs
    .readdirSync(catalogDir)
    .filter((file) => file.match(/^\d{5}_catalog\.json$/));

  console.log(`Found ${catalogFiles.length} catalog files to process`);

  // We'll collect all professors across all catalogs first
  const allProfessors = new Set();
  const allCatalogs = {};

  // Load all catalog data and collect professors
  for (const filename of catalogFiles) {
    const filePath = path.join(catalogDir, filename);
    const catalogData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    allCatalogs[filename] = catalogData;

    Object.values(catalogData).forEach((dept) => {
      Object.values(dept.courses).forEach((course) => {
        course.professors.forEach((professor) => {
          allProfessors.add(professor);
        });
      });
    });
  }

  // 3. Seed professors
  console.log(`Seeding ${allProfessors.size} professors...`);
  const professorMap = new Map();

  for (const professorName of allProfessors) {
    const professor = await prisma.professor.upsert({
      where: { name: professorName },
      update: {},
      create: { name: professorName },
    });
    professorMap.set(professorName, professor.id);
  }

  console.log(`Seeded ${allProfessors.size} professors successfully`);

  // 4. Seed courses and course instances
  console.log("Seeding courses and course instances...");
  let coursesCount = 0;
  let courseInstancesCount = 0;
  const courseCodeToIdMap = new Map(); // Will store course code -> id mappings for curriculum entries

  // Process each catalog file
  for (const filename of catalogFiles) {
    const { year, semester } = extractYearSemester(filename);
    const catalogData = allCatalogs[filename];

    console.log(`Processing catalog for ${year} semester ${semester}...`);

    for (const [deptId, deptData] of Object.entries(catalogData)) {
      const departmentId = departmentMap.get(deptId);

      if (!departmentId) {
        console.warn(
          `Department ID ${deptId} not found in departments.json. Skipping...`
        );
        continue;
      }

      for (const [courseCode, courseData] of Object.entries(deptData.courses)) {
        // Default description - in a real scenario, you might have actual descriptions
        const description = `Course in ${deptData.department}`;

        // Create or update the course
        const course = await prisma.course.upsert({
          where: { code: courseCode },
          update: {
            name: courseData.name,
            description,
            departmentId,
          },
          create: {
            code: courseCode,
            name: courseData.name,
            description,
            departmentId,
          },
        });

        if (!course) {
          console.warn(`Failed to create course ${courseCode}. Skipping...`);
          continue;
        }

        // Store the course code to id mapping for curriculum entries
        courseCodeToIdMap.set(courseCode, course.id);

        coursesCount++;

        // Create course instances for each professor
        for (const professorName of courseData.professors) {
          const professorId = professorMap.get(professorName);

          if (!professorId) {
            console.warn(`Professor ${professorName} not found. Skipping...`);
            continue;
          }

          try {
            await prisma.courseInstance.upsert({
              where: {
                courseId_year_semester: {
                  courseId: course.id,
                  year,
                  semester,
                },
              },
              update: {
                professorId,
              },
              create: {
                courseId: course.id,
                professorId,
                year,
                semester,
              },
            });

            courseInstancesCount++;
          } catch (error) {
            console.warn(
              `Error creating course instance for ${courseCode} with professor ${professorName}:`,
              error
            );
          }
        }
      }
    }
  }

  console.log(`Seeded ${coursesCount} courses successfully`);
  console.log(`Seeded ${courseInstancesCount} course instances successfully`);

  // 5. Seed careers and curriculum entries
  console.log("Seeding careers and curriculum entries...");
  let careerCount = 0;
  let curriculumEntriesCount = 0;

  for (const [careerName, semesters] of Object.entries(careerPrograms)) {
    // Create the career
    const career = await prisma.career.upsert({
      where: { name: careerName },
      update: {},
      create: {
        name: careerName,
      },
    });

    careerCount++;

    // Process each semester for this career
    for (const [semesterName, courses] of Object.entries(semesters)) {
      // Extract semester number from name (e.g. "Semestre I" -> 1)
      const semesterMatch = semesterName.match(/Semestre\s+([IVX]+)/i);
      if (!semesterMatch) continue;

      const semesterRoman = semesterMatch[1];
      const semesterNum = romanToInt(semesterRoman);

      if (!semesterNum) {
        console.warn(`Could not parse semester number from ${semesterName}`);
        continue;
      }

      // Add each course for this semester
      for (const course of courses) {
        const courseCode = course.code;

        // Skip entries without course codes
        if (!courseCode || courseCode.trim() === "") continue;

        // Find the course ID from our mapping
        const courseId = courseCodeToIdMap.get(courseCode);
        if (!courseId) {
          console.warn(
            `Course with code ${courseCode} not found in the database`
          );
          continue;
        }

        try {
          // Create the curriculum entry
          await prisma.curriculumEntry.upsert({
            where: {
              careerId_courseId: {
                careerId: career.id,
                courseId: courseId,
              },
            },
            update: {
              semester: semesterNum,
            },
            create: {
              careerId: career.id,
              courseId: courseId,
              semester: semesterNum,
            },
          });

          curriculumEntriesCount++;
        } catch (error) {
          console.warn(
            `Error creating curriculum entry for career ${careerName}, course ${courseCode}:`,
            error
          );
        }
      }
    }
  }

  console.log(`Seeded ${careerCount} careers successfully`);
  console.log(
    `Seeded ${curriculumEntriesCount} curriculum entries successfully`
  );

  // 6. Seed sample reviews
  console.log("Seeding sample reviews...");

  // Get some course instances
  const courseInstances = await prisma.courseInstance.findMany({
    take: 100,
  });

  let reviewCount = 0;

  for (const instance of courseInstances) {
    // Add 1-3 reviews per course instance
    const numReviews = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < numReviews; i++) {
      await prisma.review.create({
        data: {
          courseInstanceId: instance.id,
          clarity: Math.floor(Math.random() * 5) + 1,
          knowledge: Math.floor(Math.random() * 5) + 1,
          workLoad: Math.floor(Math.random() * 5) + 1,
          difficulty: Math.floor(Math.random() * 5) + 1,
          overall: Math.floor(Math.random() * 5) + 1,
          approximateMedian: Math.floor(Math.random() * 7) + 1,
          comment: [
            "Great course!",
            "Difficult but rewarding",
            "Professor was very helpful",
            "Too much workload",
            "Excellent teaching methods",
            "Very clear explanations",
            "Challenging assignments but learned a lot",
          ][Math.floor(Math.random() * 7)],
        },
      });

      reviewCount++;
    }
  }

  console.log(`Seeded ${reviewCount} sample reviews successfully`);
  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
