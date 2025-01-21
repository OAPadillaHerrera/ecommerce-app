

/* 

This file defines the `ProductsRepository` class, which manages interactions with the `Products` entity in a NestJS application. 
It uses TypeORM to perform CRUD operations, handle relationships with categories, and support advanced features like pagination. 
The repository ensures robust error handling and clean data management.

*/

import { Injectable } from "@nestjs/common"; // Import Injectable decorator from NestJS.
import { Repository } from "typeorm"; // Import Repository to interact with the database.
import { Products } from "./products.entity"; // Import Products entity for database operations.
import { InjectRepository } from "@nestjs/typeorm" // / Import InjectRepository to inject a TypeORM repository.
import { Categories } from "../Categories/categories.entity"; // Import Categoriejs/typeorm"; 
import { createProductDto } from "./dtos/CreateProductDto"; // Import the DTO (Data Transfer Object) for creating a product
import { updateProductDto } from "./dtos/UpdateProductDto"; // Import the DTO for updating a product


@Injectable () // Mark this class as injectable for dependency injection.

export class ProductsRepository {
  

  constructor (

    @InjectRepository (Products) // Inject the TypeORM repository for the Products entity.
    private readonly productsRepository: Repository<Products>, // Define the repository as a private readonly property.

  ) {}

  async getProducts (): Promise<Products[]> { // Method to fetch all products.

    return await this.productsRepository.find ({ relations: ["categories"] }); // Fetch products with related categories.

  }

  async getById (id: string): Promise<Products | null> { // Method to fetch a product by ID.

    return await this.productsRepository.findOne ({ // Find a product by ID.

      where: { id }, // Search condition: product ID.
      relations: ["categories"], // Include related categories in the query.

    });

  }

  async createProduct (product: createProductDto): Promise<{ id: string }> { // Method to create a new product.

    try {

      const category = await this.productsRepository.manager.findOne (Categories, { // Find the category by name.
        where: { name: product.categories }, // Search condition: category name.

      });

      if (!category) { // If the category is not found.

        throw new Error (`Category not found: ${product.categories}`); // Throw an error.

      }

      const newProduct = this.productsRepository.create ({ // Create a new product instance.

        ...product, // Spread product properties.
        categories: category, // Assign the category entity.

      });

      const result = await this.productsRepository.save (newProduct); // Save the new product to the database.      
      return { id: result.id }; // Return the ID of the newly created product.

    } catch (error) { // Catch any errors during the process.
   
      throw error; // Re-throw the error.

    }

  }

  async updateProduct (id: string, updateData: Partial<updateProductDto>): Promise<{ id: string }> { // Method to update a product.

    const product = await this.productsRepository.findOne ({ where: { id } }); // Find the product by ID.

    if (!product) { // If the product is not found.

      throw new Error ("Product not found"); // Throw an error.

    }

    Object.assign (product, updateData); // Update product fields with new data.
    const updatedProduct = await this.productsRepository.save (product); // Save changes to the database.
    return { id: updatedProduct.id }; // Return the ID of the updated product.

  }

  async deleteProduct (id: string): Promise<{ id: string }> { // Method to delete a product.

    const product = await this.productsRepository.findOne ({ where: { id } }); // Find the product by ID.

    if (!product) { // If the product is not found.

      throw new Error ("Product not found"); // Throw an error.

    }

    await this.productsRepository.remove (product); // Remove the product from the database.
    return { id }; // Return the ID of the deleted product.

  }

  async getPaginatedProducts ( // Method to fetch paginated products.

    page: number = 1, // Default to page 1.
    limit: number = 5, // Default to 5 items per page.

  ): Promise<{

    products: Products[];
    totalProducts: number;
    totalPages: number;
    currentPage: number;

  }> {

    const [products, totalProducts] = await this.productsRepository.findAndCount ({ // Fetch products and total count.

      skip: (page - 1) * limit, // Calculate records to skip.
      take: limit, // Limit the number of records fetched.
      relations: ["categories"], // Include related categories.

    });

    const totalPages = Math.ceil (totalProducts / limit); // Calculate the total number of pages.

    return {

      products, // List of products.
      totalProducts, // Total number of products.
      totalPages, // Total pages.
      currentPage: page, // Current page.

    };

  }

  async findByName (name: string): Promise<Products | null> { // Method to find a product by name.

    return await this.productsRepository.findOne ({ // Find a product by name.
      where: { name }, // Search condition: product name.
      relations: ["categories"], // Include related categories.

    });

  }
  
}
