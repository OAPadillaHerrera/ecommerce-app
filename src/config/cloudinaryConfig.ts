

/**

 * This file defines the `CloudinaryConfig`, which is responsible for 
 * configuring the Cloudinary SDK with credentials loaded from environment variables.
 * It provides a factory for injecting Cloudinary configuration into the application.
 
*/

import { v2 } from "cloudinary"; // Import the Cloudinary SDK.
import { config as dotenvConfig } from "dotenv"; // Import dotenv to load environment variables.

dotenvConfig ({ path: "../../.env.development" }); // Load environment variables from the '.env.development' file.

export const CloudinaryConfig = {

  provide: "CLOUDINARY", // Token used for injecting the Cloudinary configuration.

  useFactory: () => {

    return v2.config({

      cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary account cloud name.
      api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key for authentication.
      api_secret: process.env.CLOUDINARY_API_SECRET, // Cloudinary API secret for secure access.

    });

  },
  
};
