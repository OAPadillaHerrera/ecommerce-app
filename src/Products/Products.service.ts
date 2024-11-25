

import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./Products.repository";
import { Product } from "./product.interface";

@Injectable ({})

export class ProductsService {

    constructor (private productsRepository: ProductsRepository) {}

    getProducts () {

        return this.productsRepository.getProducts ();
        
    }

    getProductById(id: number) {

        return this.productsRepository.getById (id);
        
    }

    createProduct (product: Omit<Product, "id">):Promise <{id: number}> {

        return this.productsRepository.createProduct (product);

    }

    updateProduct (id: number, updateData: Partial <Product>) {

        return this.productsRepository.updateProduct (id, updateData);

    }

    deleteProduct (id: number) {

        return this.productsRepository.deleteProduct (id);

    }

    async getPaginatedProducts (page: number, limit: number) {
        console.log (`Service: Page=${page}, Limit=${limit}`);
        const result = await this.productsRepository.getPaginatedProducts(page, limit);
        console.log ("Service: Result =", result);
        return result;
    }
    
}



