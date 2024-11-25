

import {Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./product.interface";
import { AuthGuard } from "src/Auth/AuthGuard";
import { ValidateGuard } from "src/guards/validate.guard";

@Controller ("products")

export class ProductsController {

    constructor (private readonly productsService: ProductsService) {}

    @Get ("/all")
    
    getProducts () {

        return this.productsService.getProducts ();

    }

    /* Obtener usuarios paginados.*/
    @Get()
    @UseGuards (AuthGuard)

    async getPaginatedProducts (

        @Query("page") page: string,
        @Query("limit") limit: string

    ) {

        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 5;

        console.log (`Controller: Page=${pageNumber}, Limit=${limitNumber}`); // Depuración
        return this.productsService.getPaginatedProducts (pageNumber, limitNumber);

    }

    @Get (":id")

    getProductById (@Param ("id") id: string) {

        return this.productsService.getProductById (Number (id));

    }

    @Post ("/all")
    @UseGuards (AuthGuard, ValidateGuard)

    createProduct (@Body () product: Product) {

        return this.productsService.createProduct (product);

    }

    @Put (":id")
    @UseGuards (AuthGuard, ValidateGuard)

    updateProduct (@Param ("id") id: string, @Body () updateData: Partial <Product>) {

        return this.productsService.updateProduct (Number (id), updateData);

    }

    @Delete (":id")
    @UseGuards (AuthGuard)

    deleteProduct (@Param ("id") id: string) {

        return this.productsService.deleteProduct (Number (id));

    }

};