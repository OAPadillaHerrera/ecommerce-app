

/*import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from "dotenv";
import { registerAs } from "@nestjs/config";

dotenvConfig ({path: ".env.develpment"})
 
const config = {

      type: "postgres",
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: parseInt ((process.env.DB_PORT), 10),
      username: process.env.DB_USERNAME,
      password: String (process.env.DB_PASSWORD),
      autoLoadEntities: true,
      synchronize: false,      
      logging: true, // Activa logs generales de TypeORM.

}

export default registerAs ("typeorm", () => config);
export const connectionSource = new DataSource (config as DataSourceOptions);*/

import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { Categories } from '../Categories/categories.entity';
import { OrderDetails } from '../OrderDetails/orderdetails.entity';
import { Users } from '../Users/users.entity';
import { Products } from '../Products/products.entity';
import { Orders } from '../Orders/orders.entity';

// Carga las variables de entorno desde el archivo .env.development
dotenvConfig({ path: '.env.development' });

// Configuración principal para TypeORM
const typeOrmConfigOptions: DataSourceOptions = {
  type: process.env.TYPEORM_TYPE as any, // Asegúrate de que TYPEORM_TYPE está definido en .env
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // Usa migraciones en lugar de sincronización automática
  logging: true,
  entities: [Categories, OrderDetails, Users, Products, Orders],
  migrations: ['dist/migrations/*.js'],
};

export const connectionSource = new DataSource(typeOrmConfigOptions);

// Exporta una función que regresa el objeto completo
export const typeOrmConfig = () => ({
  typeorm: typeOrmConfigOptions,
});
