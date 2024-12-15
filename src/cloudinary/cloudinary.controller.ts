

/**
 * This file defines the `CloudinaryController` class, which handles the uploading 
 * of files to Cloudinary using a dedicated service.
 * 
 * It provides an endpoint to upload a file and process it for storage.
 */

import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')

export class CloudinaryController {

  /**
   * Initializes the `CloudinaryController` with an instance of `CloudinaryService`.
   * 
   * @param cloudinaryService - Service responsible for uploading files to Cloudinary.
   */

  constructor (private readonly cloudinaryService: CloudinaryService) {}

  /**
   * Handles `POST /cloudinary/upload`.
   * 
   * Uploads a file to Cloudinary. Validates that a file has been received.
   * 
   * @param file - The uploaded file to be sent to Cloudinary.
   * @returns The result of the upload operation, including file details.
   * @throws Error if no file is received.
   */

  @Post ('upload')
  @UseInterceptors (FileInterceptor ('file'))

  async uploadFile (@UploadedFile () file: Express.Multer.File) {

    if (!file) {

      throw new Error ("No file have been received");

    }

    return this.cloudinaryService.uploadImage (file);

  }

}
