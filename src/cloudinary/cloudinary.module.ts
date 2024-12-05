

import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryRepository } from './cloudinary.repository';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryConfig } from '../config/cloudinaryConfig'; 

@Module({
  providers: [CloudinaryService, CloudinaryRepository, CloudinaryConfig],
  controllers: [CloudinaryController],
  exports: [CloudinaryService, CloudinaryRepository],
})
export class CloudinaryModule {}
