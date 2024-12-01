

import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import * as fs from "fs/promises";
import * as path from "path";
import { Categories } from "./categories.entity";

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  // Obtener todas las categorías usando el método del repositorio
  async getCategories(): Promise<Categories[]> {
    return this.categoriesRepository.getCategories();
  }

  // Agregar una nueva categoría validando si ya existe
  async addCategories(category: { name: string }): Promise<string> {
    const existingCategories = await this.getCategories();
    const categoryExists = existingCategories.some(
      (existing) => existing.name === category.name,
    );

    if (!categoryExists) {
      await this.categoriesRepository.addCategories(category);
      return `Category "${category.name}" added successfully.`;
    }

    return `Category "${category.name}" already exists.`;
  }

  // Sembrar categorías desde un archivo JSON
  async seedCategoriesFromFile(): Promise<string> {
    try {
      // Ruta del archivo
      const filePath = path.resolve(__dirname, "../../src/Archivo_actividad_3.js");

      // Leer y parsear el archivo
      const rawData = await fs.readFile(filePath, "utf-8");
      const products = JSON.parse(rawData);

      // Validar que las categorías sean strings y extraerlas
      const uniqueCategories = Array.from(
        new Set<string>(
          products
            .map((product) => product.category)
            .filter((category): category is string => typeof category === "string"),
        ),
      ).map((category: string) => ({ name: category }));

      // Insertar categorías en la base de datos
      for (const category of uniqueCategories) {
        await this.addCategories(category);
      }

      return "Categories have been seeded successfully.";
    } catch (error) {
      console.error("Error seeding categories:", error);
      throw new Error("Failed to seed categories.");
    }
  }

  // Buscar una categoría por nombre
  async findByName(name: string): Promise<Categories | null> {
    const categories = await this.getCategories();
    return categories.find((category) => category.name === name) || null;
  }
}




