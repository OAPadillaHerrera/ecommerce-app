

import { IsNotEmpty, IsUUID, IsArray, ArrayMinSize, ValidateIf } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'El campo userId no puede estar vacío.' })
  @IsUUID('4', { message: 'El campo userId debe ser un UUID válido.' })
  userId: string;

  @IsArray({ message: 'El campo products debe ser un array.' })
  @ArrayMinSize(1, { message: 'El array products debe contener al menos un elemento.' })
  products: Record<string, any>[]; // Representación dinámica de objetos
}

// Validación dinámica dentro de cada objeto del array
export function validateProducts(products: Record<string, any>[]) {
  for (const product of products) {
    if (!product.id || typeof product.id !== 'string') {
      throw new Error('Cada producto debe tener un id válido y debe ser un string.');
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(product.id)) {
      throw new Error('Cada id en products debe ser un UUID válido.');
    }
  }
}



  
  
  
  
