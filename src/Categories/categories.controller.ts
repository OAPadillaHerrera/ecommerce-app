

import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get("/seeder")
  async seedCategories() {
    try {
      const result = await this.categoriesService.seedCategoriesFromFile();
      return result;
    } catch (error) {
      return `Failed to seed categories: ${error.message}`;
    }
  }

@Post("/add")
  async addCategory(@Body() category: { name: string }) {
    try {
      const result = await this.categoriesService.addCategories(category);
      return result;
    } catch (error) {
      return `Failed to add category: ${error.message}`;
    }
  }
}

