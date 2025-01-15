

/**
 
 * This file defines the `CategoriesController` class, which handles category-related routes.
 * It provides endpoints to seed categories into the database and add new categories.
 * The controller interacts with the `CategoriesService` to execute business logic.
 
*/

import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service"; // Service for category-related logic.

@Controller ("categories") // Controller for category routes.

export class CategoriesController {

  constructor (private readonly categoriesService: CategoriesService) {} // Injects CategoriesService.

  @Get ("/seeder") // Endpoint: GET /categories/seeder.

  async seedCategories () {

    try {

      const result = await this.categoriesService.seedCategoriesFromFile (); // Seeds categories from a file.
      return result;

    } catch (error) {

      return `Failed to seed categories: ${error.message}`; // Handles errors during seeding.

    }

  }

  @Post ("/add") // Endpoint: POST /categories/add.

  async addCategories (@Body () category: { name: string }) {

    try {

      const result = await this.categoriesService.addCategories (category); // Adds a new category.
      return result;

    } catch (error) {

      return `Failed to add category: ${error.message}`; // Handles errors during addition.

    }

  }
  
}
