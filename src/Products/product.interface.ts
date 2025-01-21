

/**
 
 * This file defines the `Product` interface, which represents 
 * the structure of a product entity in the application.
 * 
 * The `Product` interface includes fields for product details, 
 * pricing, stock, and categorization. It is used to ensure 
 * consistency in how product data is created, stored, and accessed.
 
*/

export interface Product {

    id: string; // Unique identifier for the product.
    name: string; // Name of the product.
    description: string; // A brief description of the product.
    price: number; // Price of the product in the respective currency.
    stock: number; // Number of items available in stock.
    imgUrl?: string; // Optional URL of the product's image.
    categories: string; // Categories or tags associated with the product.

}
