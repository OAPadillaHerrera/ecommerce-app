

/**
 * This file defines the `FileValidationPipe` class, which is responsible for validating 
 * uploaded files in terms of presence, size, and MIME type.
 * 
 * It ensures that files meet specific requirements before further processing.
 */

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable ()

export class FileValidationPipe implements PipeTransform {

  /**
   * Transforms and validates an uploaded file.
   * 
   * The validation includes:
   * - Ensuring the file is provided.
   * - Verifying the file size does not exceed 200 KB.
   * - Checking that the file's MIME type is allowed (`image/jpeg`, `image/jpg`, `image/png`).
   * 
   * @param file - The uploaded file to validate.
   * @returns The validated file if all checks pass.
   * @throws BadRequestException if any validation fails.
   */

  transform (file: Express.Multer.File) {

    // Check if the file is provided
    if (!file) {

      throw new BadRequestException('No file has been provided');

    }
  
    const maxSize = 200 * 1024; // Validate the file size (200 KB = 200 * 1024 bytes)

    if (file.size > maxSize) {

      throw new BadRequestException (

        `The file exceeds the maximum allowed size of 200 KB. Received size: ${(file.size / 1024).toFixed(2)} KB`,

      );

    }

    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];  // Validate the file's MIME type

    if (!allowedMimeTypes.includes (file.mimetype)) {

      throw new BadRequestException (

        `Invalid file type. Allowed types: ${allowedMimeTypes.join(', ')}`,

      );

    }

    
    return file; // Return the file if it passes all validations

  }

}
