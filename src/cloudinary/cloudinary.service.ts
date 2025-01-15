

/* 

This file defines the `CloudinaryService` class, which handles image uploads to Cloudinary in a NestJS application. 
It uses the Cloudinary SDK to upload images and a helper library, `buffer-to-stream`, to convert file buffers into streams. 
Error handling is implemented to ensure reliability.

*/

import { Injectable } from "@nestjs/common"; // Import Injectable decorator from NestJS.
import { UploadApiResponse, v2 } from "cloudinary"; // Import Cloudinary's SDK and types for API responses.
import toStream from "buffer-to-stream"; // Import utility to convert buffer to stream.

@Injectable() // Mark this class as a service in the NestJS dependency injection system.

export class CloudinaryService {

  async uploadImage (file: Express.Multer.File): Promise<UploadApiResponse> { // Method to upload an image to Cloudinary.

    return new Promise ((resolve, reject) => { // Return a Promise for asynchronous handling.

      const upload = v2.uploader.upload_stream( // Create a Cloudinary upload stream.

        { resource_type: "auto" }, // Automatically detect the resource type (e.g., image, video).

        (error, result) => { // Callback for handling the result of the upload.

          if (error) { // If an error occurs.

            reject (error); // Reject the promise with the error.

          } else { // If the upload is successful.

            resolve (result); // Resolve the promise with the result.

          }
        },
      );

      toStream (file.buffer).pipe (upload); // Convert the file buffer to a stream and pipe it to the upload stream.

    });

  }
  
}
