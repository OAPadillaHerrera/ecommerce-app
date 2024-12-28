

import { ApiProperty } from '@nestjs/swagger';

import {

  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
  IsInt,
  Min,
  IsPositive,

} from 'class-validator';

export class createProductDto {

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'name: Name is required. Name must be a string chain.', example: 'Laptop', })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'description: Description is required. Description must be a string chain.', example: 'A high performance laptop for professionals.', })
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'price: Price is required.  Price must be a positive number higher than 0.', example: 1500.99, })
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ description: 'stock: Available quantity in inventory. Stock must be an integer number higher than 0.', example: 25, })
  stock?: number;

  @IsOptional()
  @IsUrl()
  @ApiProperty({ description: 'imgUrl: URL image. URL must be a valid link.', example: 'https://example.com/product-image.jpg', })
  imgUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'categories: Categories associated to a product. Categories must be a name.', example: 'Electronics', })
  categories?: string;

}
