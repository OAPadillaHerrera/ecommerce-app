

/* 

This file defines the `ProductsService` class, which manages product-related operations in a NestJS application. 
It interacts with `ProductsRepository` for database operations, `CategoriesService` for category validation, and 
`CloudinaryService` for handling image uploads. Additional features include product seeding and pagination.

*/

import { Injectable, NotFoundException } from "@nestjs/common"; // Import Injectable and NotFoundException from NestJS.
import { ProductsRepository } from "./products.repository"; // Import ProductsRepository for product data management.
import { CategoriesService } from "../Categories/categories.service"; // Import CategoriesService for category operations.
import { CloudinaryService } from "../cloudinary/cloudinary.service"; // Import CloudinaryService for image uploads.
import { createProductDto } from "./dtos/CreateProductDto"; // Import createProductDto for product creation validation.
import { updateProductDto } from "./dtos/UpdateProductDto";

@Injectable () // Mark this class as injectable for dependency injection.

export class ProductsService {

  constructor (

    private readonly productsRepository: ProductsRepository, // Inject ProductsRepository.
    private readonly categoriesService: CategoriesService, // Inject CategoriesService.
    private readonly cloudinaryService: CloudinaryService, // Inject CloudinaryService.

  ) {}

  getProducts () { // Method to retrieve all products.

    return this.productsRepository.getProducts (); // Fetch all products from the repository.

  }

  getProductById (id: string) { // Method to retrieve a product by ID.

    return this.productsRepository.getById (id); // Fetch product by ID from the repository.

  }

  async createProduct (product: createProductDto): Promise<{ id: string }> { // Method to create a new product.

    const categoryExists = await this.categoriesService.findByName (product.categories); // Check if the category exists.

    if (!categoryExists) { // If the category doesn't exist.

      throw new Error (`Category not found: ${product.categories}`); // Throw an error.

    }

    return this.productsRepository.createProduct ({ // Create the product.

      ...product, // Spread product properties.
      categories: product.categories, // Pass categories as a string.

    });

  }

  async updateProduct (id: string, updateData: updateProductDto) { // Method to update a product.

    const product = await this.productsRepository.updateProduct (id, updateData); // Attempt to update the product.

    if (!product) { // If the product doesn't exist.

      throw new NotFoundException ('Product not found'); // Throw a NotFoundException.

    }

    return this.productsRepository.updateProduct (id, updateData); // Return the updated product.

  }   
    
  deleteProduct (id: string) { // Method to delete a product.

    return this.productsRepository.deleteProduct (id); // Delete the product by ID.

  }

  async getPaginatedProducts (page: number, limit: number) { // Method to retrieve paginated products.

    const result = await this.productsRepository.getPaginatedProducts (page, limit); // Fetch paginated products.
    return result; // Return the paginated result.

  }

  async seedProductsFromFile (filePath: string): Promise<string> { // Method to seed products from a file.

    try {

      const products = require (filePath); // Load the file.
      
      for (const product of products) { // Iterate over each product.

        const category = await this.categoriesService.findByName (product.category); // Check if the category exists.

        if (!category) { // If the category doesn't exist.
          
          await this.categoriesService.addCategories ({ name: product.category }); // Create the category.

        }

        const productExists = await this.productsRepository.findByName (product.name); // Check if the product exists.

        if (productExists) { // If the product already exists.

          continue; // Skip to the next product.

        }

        await this.createProduct ({ // Create the product.

          name: product.name, // Set the product name.
          description: product.description, // Set the description.
          price: product.price, // Set the price.
          stock: product.stock, // Set the stock.
          imgUrl: product.imgUrl || "default-image-url.jpg", // Use default image URL if none is provided.
          categories: product.category, // Pass the category name.

        });

      }

      return "Products seeded successfully."; // Return success message.

    } catch (error) { // Handle any errors.

        throw error; // Re-throw the error.

    }

  }

  async uploadProductImage (productId: string, file: Express.Multer.File): Promise<{ id: string }> { // Method to upload a product image.

    const product = await this.getProductById (productId); // Fetch the product by ID.

    if (!product) { // If the product doesn't exist.

      throw new Error ('Product not found'); // Throw an error.
    }

    if (!file) { // If no file is provided.

      throw new Error ('A file has not been provided'); // Throw an error.

    }

    const uploadResult = await this.cloudinaryService.uploadImage (file); // Upload the file to Cloudinary.
    return this.productsRepository.updateProduct (productId, { imgUrl: uploadResult.secure_url }); // Update the product with the image URL.

  }
  
}







