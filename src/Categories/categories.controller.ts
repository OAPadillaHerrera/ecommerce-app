

import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";

@Controller ("categories")

export class CategoriesController {

  /**
   * Initializes the `CategoriesController` with an instance of `CategoriesService`.
   * 
   * @param categoriesService - Service responsible for managing category-related business logic.
   */

  constructor (private readonly categoriesService: CategoriesService) {}

  /**
   * Handles `GET /categories/seeder`.
   * 
   * Seeds categories into the database using data from a file.
   * 
   * @returns A success message or an error message if seeding fails.
   */

  @Get ("/seeder")

  async seedCategories () {

    try {

      const result = await this.categoriesService.seedCategoriesFromFile ();
      return result;

    } catch (error) {

      return `Failed to seed categories: ${error.message}`;

    }

  }

  /**
   * Handles `POST /categories/add`.
   * 
   * Adds a new category to the database.
   * 
   * @param category - An object containing the name of the category to add.
   * @returns A success message or an error message if adding fails.
   */

  @Post("/add")

  async addCategory (@Body() category: { name: string }) {

    try {

      const result = await this.categoriesService.addCategories(category);
      return result;

    } catch (error) {

      return `Failed to add category: ${error.message}`;

    }

  }
  
}
