

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Categories } from "./categories.entity";

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  // Obtener todas las categorías
  async getCategories(): Promise<Categories[]> {
    return this.categoriesRepository.find();
  }

  // Agregar una nueva categoría
  async addCategories(category: { name: string }): Promise<Categories> {
    const newCategory = this.categoriesRepository.create(category);
    return await this.categoriesRepository.save(newCategory);
  }
}




