

import { IsString, IsOptional, IsNumber, IsUrl, IsInt, Min, IsPositive } from 'class-validator';

export class createProductDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    price?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    stock?: number;

    @IsOptional()
    @IsUrl()
    imgUrl?: string;

    @IsOptional()
    @IsString()
    categories?: string; // Cambia si envías un ID en lugar de un nombre.
}

