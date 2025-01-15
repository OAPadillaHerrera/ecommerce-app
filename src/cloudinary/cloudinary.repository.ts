

/* 

This file defines the `CloudinaryRepository` class, which manages file uploads to Cloudinary in a NestJS application. 
It uses the Cloudinary SDK for uploading files and the `buffer-to-stream` library to convert file buffers into streams. 
Error handling is implemented to ensure reliability and provide clear feedback in case of failures.

*/

import { Injectable, BadRequestException } from '@nestjs/common'; // Import Injectable decorator and BadRequestException for error handling.
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'; // Import Cloudinary SDK and response type for uploads.
import toStream from 'buffer-to-stream'; // Import utility to convert buffer to stream.

@Injectable () // Marks this class as injectable for dependency injection.

export class CloudinaryRepository {

  async uploadFile (file: Express.Multer.File): Promise<UploadApiResponse> { // Method to upload a file to Cloudinary.

    return new Promise ((resolve, reject) => { // Return a Promise for asynchronous handling.

      const upload = cloudinary.uploader.upload_stream ( // Create a Cloudinary upload stream.

        { resource_type: 'auto' }, // Automatically detect the resource type (e.g., image, video, etc.).

        (error, result) => { // Callback for handling the result of the upload.

          if (error) { // If an error occurs.

            reject (new BadRequestException (`Error at uploading file: ${error.message}`)); // Reject the promise with a formatted error message.

          } else { // If the upload is successful.

            resolve (result); // Resolve the promise with the upload result.

          }
          
        },

      );

      toStream (file.buffer).pipe (upload); // Convert the file buffer to a stream and pipe it to the upload stream.

    });

  }

}
