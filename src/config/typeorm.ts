

/**
 
 * This file defines the TypeORM configuration for database connectivity. 
 * It loads environment variables, sets up database connection options, 
 * and initializes the TypeORM data source for use in the application.
 
*/

import { DataSource, DataSourceOptions } from 'typeorm'; // Import TypeORM's DataSource and configuration options.
import { config as dotenvConfig } from 'dotenv'; // Import dotenv to load environment variables.

dotenvConfig ({ path: '.env.development' }); // Load environment variables from the '.env.development' file.

const typeOrmConfigOptions: DataSourceOptions = {

  type: process.env.TYPEORM_TYPE as any, // The database type, defined in the environment variables.
  host: process.env.DB_HOST, // Database host URL or IP.
  port: parseInt (process.env.DB_PORT, 10), // Port for connecting to the database.
  username: process.env.DB_USERNAME, // Database username.
  password: process.env.DB_PASSWORD, // Database password.
  database: process.env.DB_NAME, // Name of the database.
  synchronize: false, // Disables auto-sync; use migrations instead for production safety.
  logging: true, // Enables query logging for debugging.
  entities: ['dist/**/*.entity{.ts,.js}'], // Entities registered for this data source.  
  migrations: process.env.NODE_ENV === 'development' 
  ? ['src/migrations/*.ts'] // If the environment is 'development', use the TypeScript migration files located in the 'src/migrations' folder.
  : ['dist/migrations/*.js'], // If the environment is not 'development' (e.g., 'production'), use the compiled JavaScript migration files located in the 'dist/migrations' folder.

};


export const connectionSource = new DataSource (typeOrmConfigOptions); // Initialize and export the TypeORM data source.

// Export a function that provides the complete TypeORM configuration object.
export const typeOrmConfig = () => ({

  typeorm: typeOrmConfigOptions,
  
});



