

/* 

This file defines the `CategoriesRepository` class, which manages interactions with the `Categories` entity in a NestJS application. 
It provides methods to fetch all categories and add new ones, using TypeORM for database operations.

*/

import { Injectable } from "@nestjs/common"; // Import Injectable decorator from NestJS.
import { InjectRepository } from "@nestjs/typeorm"; // Decorator to inject a TypeORM repository.
import { Repository } from "typeorm"; // Import Repository to interact with the database.
import { Categories } from "./categories.entity"; // Import Categories entity for database operations.

@Injectable() // Marks this class as injectable for dependency injection.

export class CategoriesRepository {

  constructor (

    @InjectRepository (Categories) // Inject the TypeORM repository for the Categories entity.
    private readonly categoriesRepository: Repository<Categories>, // Define the repository as a private readonly property.

  ) {}

  async getCategories (): Promise<Categories []> { // Method to fetch all categories.

    return this.categoriesRepository.find (); // Use the TypeORM repository to fetch all records.

  }

  async addCategories (category: { name: string }): Promise<Categories> { // Method to add a new category.

    const newCategory = this.categoriesRepository.create (category); // Create a new category instance from the input data.
    return await this.categoriesRepository.save (newCategory); // Save the new category to the database and return it.

  }
  
}


