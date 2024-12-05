

import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { CategoriesService } from "../Categories/categories.service";
import { Product } from "./product.interface";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesService: CategoriesService,
    private readonly cloudinaryService: CloudinaryService, 
  ) {}

  // Obtener todos los productos
  getProducts() {
    return this.productsRepository.getProducts();
  }

  // Obtener producto por ID
  getProductById(id: /*number*/string) {
    return this.productsRepository.getById(id);
  }

  // Crear un nuevo producto
  async createProduct(product: Omit<Product, "id">): Promise<{ id: string }> {
    // Verificar si la categoría existe
    const categoryExists = await this.categoriesService.findByName(product.categories);
    if (!categoryExists) {
      throw new Error(`Categoría no encontrada: ${product.categories}`);
    }

    return this.productsRepository.createProduct({
      ...product,
      categories: product.categories, // Sigue siendo string
    });
  }

  // Actualizar un producto
  updateProduct(id: /*number*/string, updateData: Partial<Product>) {
    return this.productsRepository.updateProduct(id, updateData);
  }

  // Eliminar un producto
  deleteProduct(id: /*number*/string) {
    return this.productsRepository.deleteProduct(id);
  }

  // Obtener productos paginados
async getPaginatedProducts(page: number, limit: number) {
  const result = await this.productsRepository.getPaginatedProducts(page, limit);
  return result;
}



  // Sembrar productos desde un archivo
  async seedProductsFromFile(filePath: string): Promise<string> {
    try {
      const products = require(filePath); // Carga el archivo
      console.log(`Productos cargados: ${products.length}`);
  
      for (const product of products) {
        // Busca la categoría en la base de datos
        const category = await this.categoriesService.findByName(product.category);
        if (!category) {
          console.log(`Creando categoría: ${product.category}`);
          await this.categoriesService.addCategories({ name: product.category });
        }
  
        // Verifica si el producto ya existe
        const productExists = await this.productsRepository.findByName(product.name);
        if (productExists) {
          console.log(`Producto duplicado omitido: ${product.name}`);
          continue;
        }
  
        // Crea el producto
        await this.createProduct({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          imgUrl: product.imgUrl || "default-image-url.jpg",
          categories: product.category, // Pasar el nombre de la categoría
        });
      }
  
      return "Productos sembrados exitosamente.";
    } catch (error) {
      console.error("Error al sembrar productos:", error.message);
      throw error;
    }
  }

  async uploadProductImage(productId: string, file: Express.Multer.File): Promise<{ id: string }> {
    const product = await this.getProductById(productId);
  
    if (!product) {
      throw new Error('Producto no encontrado');
    }
  
    if (!file) {
      throw new Error('No se ha proporcionado un archivo');
    }
  
    const uploadResult = await this.cloudinaryService.uploadImage(file);
  
    return this.productsRepository.updateProduct(productId, { imgUrl: uploadResult.secure_url });
  } 
  
}









