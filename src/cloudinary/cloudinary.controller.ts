

/**
 
 * This file defines the `CloudinaryController` class, which handles file uploads to Cloudinary.
 * It provides an endpoint to upload files and processes them using the `CloudinaryService`.
 
*/

import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'; // Interceptor for handling file uploads.
import { CloudinaryService } from './cloudinary.service'; // Service for interacting with Cloudinary.

@Controller ('cloudinary') // Controller for Cloudinary-related routes.

export class CloudinaryController {

  constructor (private readonly cloudinaryService: CloudinaryService) {} // Injects CloudinaryService.

  @Post ('upload') // Endpoint: POST /cloudinary/upload.
  @UseInterceptors (FileInterceptor ('file')) // Intercepts file uploads.

  async uploadFile (@UploadedFile () file: Express.Multer.File) {

    if (!file) { // Validates if a file was uploaded.

      throw new Error ("No file has been received");

    }

    return this.cloudinaryService.uploadImage (file); // Uploads the file to Cloudinary.

  }
  
}

