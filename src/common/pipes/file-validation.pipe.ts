

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    // Validar si el archivo está presente
    if (!file) {
      throw new BadRequestException('No se ha proporcionado ningún archivo');
    }

    // Validar el tamaño del archivo (200 KB = 200 * 1024 bytes)
    const maxSize = 200 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException(
        `El archivo excede el tamaño máximo permitido de 200 KB. Tamaño recibido: ${(file.size / 1024).toFixed(2)} KB`,
      );
    }

    // Validar el tipo MIME del archivo
    const allowedMimeTypes = ['image/jpeg', 'image/jpg','image/png'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `El tipo de archivo no es válido. Tipos permitidos: ${allowedMimeTypes.join(', ')}`,
      );
    }

    // Si pasa las validaciones, retorna el archivo
    return file;
  }
}
