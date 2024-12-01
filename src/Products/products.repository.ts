

import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Products } from "./products.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.interface";
import { Categories } from "src/Categories/categories.entity";

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly /*repository*/productsRepository: Repository <Products> 
  ) {}

  // Array de productos inicial
  private products: Product[] = [
    {
      id: 1,
      name: "Turntable",
      description: "High-quality turntable for vinyl enthusiasts.",
      price: 1500,
      stock: 2,
      imgUrl: "https://example.com/images/turntable.jpg",
      categories: undefined,
    },
    {
      id: 2,
      name: "Amplifier",
      description: "Powerful amplifier with rich sound.",
      price: 3000,
      stock: 3,
      imgUrl: "https://example.com/images/amplifier.jpg",
      categories: undefined,
    },
    {
      id: 3,
      name: "Speaker",
      description: "Compact speaker with excellent sound quality.",
      price: 2000,
      stock: 4,
      imgUrl: "https://example.com/images/speaker.jpg",
      categories: undefined,
    },
    {
      id: 4,
      name: "Headphones",
      description: "Noise-cancelling headphones with immersive sound.",
      price: 800,
      stock: 5,
      imgUrl: "https://example.com/images/headphones.jpg",
      categories: undefined,
    },
    {
      id: 5,
      name: "Microphone",
      description: "Studio-grade microphone for professional recordings.",
      price: 1200,
      stock: 6,
      imgUrl: "https://example.com/images/microphone.jpg",
      categories: undefined,
    },
    {
      id: 6,
      name: "Subwoofer",
      description: "Deep bass subwoofer for a full sound experience.",
      price: 1800,
      stock: 7,
      imgUrl: "https://example.com/images/subwoofer.jpg",
      categories: undefined,
    },
    {
      id: 7,
      name: "Mixer",
      description: "Professional audio mixer for DJs and sound engineers.",
      price: 2500,
      stock: 8,
      imgUrl: "https://example.com/images/mixer.jpg",
      categories: undefined,
    },
    {
      id: 8,
      name: "Bluetooth Receiver",
      description: "Wireless Bluetooth receiver for high-fidelity audio.",
      price: 500,
      stock: 9,
      imgUrl: "https://example.com/images/bluetooth-receiver.jpg",
      categories: undefined,
    },
    {
      id: 9,
      name: "Turntable Needle",
      description: "Replacement needle for turntables, ensuring quality playback.",
      price: 100,
      stock: 10,
      imgUrl: "https://example.com/images/turntable-needle.jpg",
      categories: undefined,
    },
    {
      id: 10,
      name: "Soundbar",
      description: "Sleek soundbar for home theater setups.",
      price: 2200,
      stock: 11,
      imgUrl: "https://example.com/images/soundbar.jpg",
      categories: undefined,
    },
  ];

  // Obtener todos los productos
  async getProducts(): Promise <Product[]> {
    console.log("Productos en memoria:", this.products);
    return this.products;
  }

  // Obtener un producto por ID
  async getById(id: number): Promise<Product | undefined> {
    return this.products.find((product) => product.id === id);
  }

  // Crear un nuevo producto
  /*async createProduct(product: Omit<Product, "id">): Promise<{ id: number }> {
    const id = this.products.length + 1;
    const newProduct: Product = { id, ...product };
    this.products.push(newProduct);
    return { id };
  }*/

    // Crear un nuevo producto
    async createProduct(product: Omit<Product, "id">): Promise<{ id: string }> {
      try {
        // Busca la categoría en la base de datos por nombre
        const category = await this./*repository*/productsRepository.manager.findOne(Categories, { where: { name: product.categories } });
        if (!category) {
          throw new Error(`Categoría no encontrada: ${product.categories}`);
        }
    
        // Crea el producto, asignando la relación con la categoría
        const newProduct = this./*repository*/productsRepository.create({
          ...product,
          categories: category, // Relación con la categoría encontrada
        });
    
        // Guarda el producto en la base de datos
        const result = await this./*repository*/productsRepository.save(newProduct);
        return { id: result.id }; // Devuelve el ID generado
      } catch (error) {
        console.error("Error al crear el producto:", error.message);
        throw error;
      }
    }
    



  // Actualizar un producto existente
  async updateProduct(id: number, updateData: Partial<Product>): Promise<{ id: number }> {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    Object.assign(product, updateData);
    return { id };
  }

  // Eliminar un producto
  async deleteProduct(id: number): Promise<{ id: number }> {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    this.products.splice(index, 1);
    return { id };
  }

  // Obtener productos paginados
  async getPaginatedProducts(
    page: number = 1,
    limit: number = 5
  ): Promise<{
    products: Product[];
    totalProducts: number;
    totalPages: number;
    currentPage: number;
  }> {
    const totalProducts = this.products.length;
    const totalPages = Math.ceil(totalProducts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const products = this.products.slice(startIndex, endIndex);

    return {
      products,
      totalProducts,
      totalPages,
      currentPage: page,
    };
  }

  // Buscar un producto por nombre
  async findByName(name: string): Promise<Product | undefined> {

  return this.products.find((product) => product.name.toLowerCase() === name.toLowerCase());

  }

}


