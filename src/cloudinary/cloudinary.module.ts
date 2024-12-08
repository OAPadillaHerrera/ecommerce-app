

/**
 * This file defines the `CloudinaryModule`, which is responsible for 
 * integrating Cloudinary services into the application. It provides 
 * functionality for handling cloud-based media storage, configuration, 
 * and related operations.
 */

import { Module } from '@nestjs/common'; // Import the decorator for defining a NestJS module.
import { CloudinaryService } from './cloudinary.service'; // Import the service for managing Cloudinary operations.
import { CloudinaryRepository } from './cloudinary.repository'; // Import the repository for abstracting database interactions related to Cloudinary.
import { CloudinaryController } from './cloudinary.controller'; // Import the controller to handle HTTP requests for Cloudinary-related functionality.
import { CloudinaryConfig } from '../config/cloudinaryConfig'; // Import the configuration class for setting up Cloudinary.

@Module ({

  providers: [CloudinaryService, CloudinaryRepository, CloudinaryConfig], // Register the service, repository, and configuration as providers for dependency injection.
  controllers: [CloudinaryController], // Register the controller for handling HTTP requests related to Cloudinary.
  exports: [CloudinaryService, CloudinaryRepository], // Export the service and repository to make them available for other modules.

})

export class CloudinaryModule {}
