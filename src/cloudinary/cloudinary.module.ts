

/** 
 
 * This file defines the `CloudinaryModule`, a NestJS module for integrating 
 * Cloudinary services into the application. It provides functionality for 
 * cloud-based media storage, configuration, and related operations, ensuring 
 * smooth interaction with the Cloudinary platform.

 */

import { Module } from '@nestjs/common'; // Importing the NestJS module decorator.
import { CloudinaryService } from './cloudinary.service'; // The service that handles business logic for Cloudinary operations.
import { CloudinaryRepository } from './cloudinary.repository'; // The repository abstracting database interactions related to Cloudinary.
import { CloudinaryController } from './cloudinary.controller'; // The controller to manage HTTP requests related to Cloudinary.
import { CloudinaryConfig } from '../config/cloudinaryConfig'; // Configuration for setting up Cloudinary API and credentials.

@Module ({

  providers: [CloudinaryService, CloudinaryRepository, CloudinaryConfig], // Declares the service, repository, and configuration as providers.
  controllers: [CloudinaryController], // Registers the controller for HTTP request handling related to Cloudinary.
  exports: [CloudinaryService, CloudinaryRepository], // Exports the service and repository for use in other modules.

})

export class CloudinaryModule {} // The `CloudinaryModule` encapsulates all Cloudinary-related functionality.

