import fs from "fs";
import path from "path";
import { promises as fsPromises } from "fs";

// Interfaces for catalog data
export interface Course {
  name: string;
  professors: string[];
}

export interface Department {
  department: string;
  courses: {
    [courseCode: string]: Course;
  };
}

export interface Catalog {
  [departmentId: string]: Department;
}

// Get all available catalog IDs
export const getCatalogIds = async (): Promise<string[]> => {
  const catalogPath = path.join(process.cwd(), "src/data/catalog");
  const files = await fsPromises.readdir(catalogPath);
  return files.map((file) => file.replace("_catalog.json", ""));
};

// Get a specific catalog by ID
export const getCatalog = async (
  catalogId: string
): Promise<Catalog | null> => {
  try {
    const catalogPath = path.join(
      process.cwd(),
      `src/data/catalog/${catalogId}_catalog.json`
    );
    const data = await fsPromises.readFile(catalogPath, "utf8");
    return JSON.parse(data) as Catalog;
  } catch (error) {
    console.error(`Error loading catalog ${catalogId}:`, error);
    return null;
  }
};

// Get all departments from a catalog
export const getDepartments = async (
  catalogId: string
): Promise<{ id: string; name: string }[] | null> => {
  const catalog = await getCatalog(catalogId);
  if (!catalog) return null;

  return Object.entries(catalog).map(([id, data]) => ({
    id,
    name: data.department,
  }));
};

// Get a specific department from a catalog
export const getDepartment = async (
  catalogId: string,
  departmentId: string
): Promise<Department | null> => {
  const catalog = await getCatalog(catalogId);
  if (!catalog || !catalog[departmentId]) return null;

  return catalog[departmentId];
};
