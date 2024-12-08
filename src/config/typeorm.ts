

/**
 * This file defines the TypeORM configuration for database connectivity. 
 * It loads environment variables, sets up database connection options, 
 * and initializes the TypeORM data source for use in the application.
 */

import { DataSource, DataSourceOptions } from 'typeorm'; // Import TypeORM's DataSource and configuration options.
import { config as dotenvConfig } from 'dotenv'; // Import dotenv to load environment variables.
import { Categories } from '../Categories/categories.entity'; // Import the Categories entity.
import { OrderDetails } from '../OrderDetails/orderdetails.entity'; // Import the OrderDetails entity.
import { Users } from '../Users/users.entity'; // Import the Users entity.
import { Products } from '../Products/products.entity'; // Import the Products entity.
import { Orders } from '../Orders/orders.entity'; // Import the Orders entity.


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
  entities: [Categories, OrderDetails, Users, Products, Orders], // Entities registered for this data source.
  migrations: ['dist/migrations/*.js'], // Location of migration files.

};


export const connectionSource = new DataSource (typeOrmConfigOptions); // Initialize and export the TypeORM data source.

// Export a function that provides the complete TypeORM configuration object.
export const typeOrmConfig = () => ({

  typeorm: typeOrmConfigOptions,
  
});
