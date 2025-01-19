

/* 

This file defines the `CategoriesService` class, which manages category-related operations in a NestJS application. 
It interacts with the `CategoriesRepository` for database operations and includes functionality for adding, retrieving, 
and seeding categories from a file. Error handling and data validation are implemented for reliability.

*/

import { Injectable } from "@nestjs/common"; // Import Injectable decorator from NestJS.
import { CategoriesRepository } from "./categories.repository"; // Import CategoriesRepository for category data management.
import * as fs from "fs/promises"; // Import fs/promises for file system operations.
import * as path from "path"; // Import path for resolving file paths.
import { Categories } from "./categories.entity"; // Import Categories entity for type safety.
import { CreateCategoryDto } from "./dtos/CreateCategoryDto";

@Injectable () // Mark this class as a service in the NestJS dependency injection system.

export class CategoriesService {

  constructor (

    private readonly categoriesRepository: CategoriesRepository, // Inject CategoriesRepository.

  ) {}

  async getCategories (): Promise<Categories[]> { // Method to retrieve all categories.

    return this.categoriesRepository.getCategories (); // Fetch all categories from the repository.

  }

  /*async addCategories (category: { name: string }): Promise<string> { // Method to add a new category.

    const existingCategories = await this.getCategories (); // Get all existing categories.
    const categoryExists = existingCategories.some ( // Check if the category already exists.

      (existing) => existing.name === category.name, // Compare by name.

    );

    if (!categoryExists) { // If the category does not exist.

      await this.categoriesRepository.addCategories (category); // Add the category to the repository.
      return `Category "${category.name}" added successfully.`; // Return success message.

    }

    return `Category "${category.name}" already exists.`; // Return message if category already exists.

  }*/

    async addCategories(category: CreateCategoryDto): Promise<string> {
      // Obtener todas las categorías existentes
      const existingCategories = await this.categoriesRepository.getCategories();
  
      // Verificar si la categoría ya existe
      const categoryExists = existingCategories.some(
        (existing) => existing.name === category.name,
      );
  
      if (!categoryExists) {
        // Agregar la categoría si no existe
        await this.categoriesRepository.addCategories(category);
        return `Category "${category.name}" added successfully.`;
      }
  
      return `Category "${category.name}" already exists.`;
    }
  

  async seedCategoriesFromFile (): Promise<string> { // Method to seed categories from a JSON file.

    try {

      const filePath = path.resolve (__dirname, "../../src/Archivo_actividad_3.js"); // Resolve the file path.
      const rawData = await fs.readFile (filePath, "utf-8"); // Read the file contents as a string.
      const products = JSON.parse (rawData); // Parse the JSON data.

      const uniqueCategories = Array.from ( // Extract unique categories from the products.

        new Set<string> ( // Use Set to ensure uniqueness.

          products

            .map ((product) => product.category) // Map products to their categories.
            .filter ((category): category is string => typeof category === "string"), // Filter out non-string categories.

        ),

      ).map ((category: string) => ({ name: category })); // Map each category to an object with a name property.

      for (const category of uniqueCategories) { // Iterate over unique categories.

        await this.addCategories (category); // Add each category using the service method.

      }

      return "Categories have been seeded successfully."; // Return success message.

    } catch (error) { // Catch any errors during the process.

        throw new Error ("Failed to seed categories."); // Throw a new error.

    }

  }

  async findByName (name: string): Promise<Categories | null> { // Method to find a category by name.

    const categories = await this.getCategories (); // Fetch all categories.
    return categories.find ((category) => category.name === name) || null; // Return the matching category or null.

  }
  
}



