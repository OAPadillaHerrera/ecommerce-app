

/**
 
 * This file defines the `CategoriesController` class, which handles category-related routes.
 * It provides endpoints to seed categories into the database and add new categories.
 * The controller interacts with the `CategoriesService` to execute business logic.
 
*/

import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service"; // Service for category-related logic.
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto } from "./dtos/CreateCategoryDto";

@ApiTags ('Categories') // Grupo para Swagger

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

  @Post ('/add') // Endpoint: POST /categories/add.

  @ApiBody ({

    description: 'Data to create a new category',
    type: CreateCategoryDto, // DTO used for Swagger.

  })

  @ApiResponse ({

    status: 201,
    description: 'Category successfully created.',

    schema: {

      example: 'Category "Electronics" added successfully.',

    },

  })

  @ApiResponse ({

    status: 400,
    description: 'Error at trying to create the category.',

    schema: {

      example: 'Failed to add category: Category name is required.',

    },

  })

  async addCategories (@Body () category: CreateCategoryDto): Promise<string> {

    try {

      const result = await this.categoriesService.addCategories (category); // Adding category.
      return result;

    } catch (error) {
        
      return `Failed to add category: ${error.message}`; // Managing errors during execution.

    }

  }  
  
}
