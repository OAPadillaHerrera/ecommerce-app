

import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Products } from "./products.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.interface";
import { Categories } from "../Categories/categories.entity";

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>
  ) {}

  // Obtener todos los productos
  async getProducts(): Promise<Products[]> {
    return await this.productsRepository.find({ relations: ["categories"] });
  }

  // Obtener un producto por ID
  async getById(id: string): Promise<Products | null> {
    return await this.productsRepository.findOne({
      where: { id },
      relations: ["categories"],
    });
  }

  // Crear un nuevo producto
  async createProduct(product: Omit<Product, "id">): Promise<{ id: string }> {
    try {
      // Buscar la categoría en la base de datos por nombre
      const category = await this.productsRepository.manager.findOne(Categories, {
        where: { name: product.categories },
      });

      if (!category) {
        throw new Error(`Categoría no encontrada: ${product.categories}`);
      }

      // Crear el producto, asignando la categoría
      const newProduct = this.productsRepository.create({
        ...product,
        categories: category,
      });

      // Guardar el producto en la base de datos
      const result = await this.productsRepository.save(newProduct);
      return { id: result.id };
    } catch (error) {
      console.error("Error al crear el producto:", error.message);
      throw error;
    }
  }

  // Actualizar un producto existente
  async updateProduct(id: string, updateData: Partial<Product>): Promise<{ id: string }> {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new Error("Product not found");
    }

    // Actualizar el producto con los nuevos datos
    Object.assign(product, updateData);

    // Guardar los cambios en la base de datos
    const updatedProduct = await this.productsRepository.save(product);
    return { id: updatedProduct.id };
  }

  // Eliminar un producto
  async deleteProduct(id: string): Promise<{ id: string }> {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new Error("Product not found");
    }

    await this.productsRepository.remove(product);
    return { id };
  }

  // Obtener productos paginados
  async getPaginatedProducts(
    page: number = 1,
    limit: number = 5
  ): Promise<{
    products: Products[];
    totalProducts: number;
    totalPages: number;
    currentPage: number;
  }> {
    const [products, totalProducts] = await this.productsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ["categories"],
    });

    const totalPages = Math.ceil(totalProducts / limit);

    return {
      products,
      totalProducts,
      totalPages,
      currentPage: page,
    };
  }

  // Buscar un producto por nombre
  async findByName(name: string): Promise<Products | null> {
    return await this.productsRepository.findOne({
      where: { name },
      relations: ["categories"],
    });
  }
}
