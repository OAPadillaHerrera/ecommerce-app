

import {BadRequestException, Injectable} from "@nestjs/common";
import { User } from "./user.interface";
import { Login } from "./login.interface";

@Injectable ()

export class usersRepository {
    
  private users: User [] = [
    { id: 1, email: "user1@example.com", name: "John Doe", password: "password123", address: "123 Main St", phone: "+34 600123456", country: "Spain", city: "Madrid" },
    { id: 2, email: "user2@example.com", name: "Jane Smith", password: "password456", address: "456 Elm St", phone: "+34 600654321", country: "Spain", city: "Barcelona" },
    { id: 3, email: "user3@example.com", name: "Bob Johnson", password: "password789", address: "789 Pine St", phone: "+34 600789123", country: "Spain", city: "Galicia" },
    { id: 4, email: "user4@example.com", name: "Alice Brown", password: "password000", address: "101 Oak St", phone: "+34 600987654", country: "Spain", city: "Sevilla" },
    { id: 5, email: "user5@example.com", name: "Charlie Green", password: "password111", address: "202 Maple St", phone: "+34 600654987", country: "Spain", city: "Valencia" },
    { id: 6, email: "user6@example.com", name: "Diana Blue", password: "password222", address: "303 Birch St", phone: "+34 600321789", country: "Spain", city: "Bilbao" },
    { id: 7, email: "user7@example.com", name: "Ethan White", password: "password333", address: "404 Cedar St", phone: "+34 600654123", country: "Spain", city: "Granada" },
    { id: 8, email: "user8@example.com", name: "Fiona Black", password: "password444", address: "505 Palm St", phone: "+34 600321654", country: "Spain", city: "Malaga" },
    { id: 9, email: "user9@example.com", name: "George Red", password: "password555", address: "606 Willow St", phone: "+34 600987321", country: "Spain", city: "Cordoba" },
    { id: 10, email: "user10@example.com", name: "Helen Grey", password: "password666", address: "707 Aspen St", phone: "+34 600123789", country: "Spain", city: "Alicante" },
  ];
  
    /* Obtener todos los usuarios*/
    async getUsers (): Promise < Omit < User, "password" > [] > {

      return this.users.map (({ password, ...user}) => user);

    } 

    async getById (id: number): Promise < Omit < User, "password" > | null>  {

      const user = this.users.find (user => user.id === id);

      if (!user) {

        return null;

      }

      const { password, ...userWithoutPassword} = user;
      return userWithoutPassword;

    }

    async createUser (user: Omit <User, "id">): Promise < {id: number} > {

      const id = this.users.length + 1;

      this.users = [...this.users, {id, ... user}];

      return {id};

    }

    async updateUser (id: number, updateData: Partial <User>): Promise < {id: number}> {

      const user = this.users.find (user => user.id === id );

      if (!user) {

        throw new Error ("User not found");

      }

      Object.keys(updateData).forEach(key => {

        if (key in user && key !== 'id') {

            (user as any)[key] = (updateData as any)[key];

        }

      });

      // Retornar el usuario actualizado
      return {id};

    }

    async deleteUser (id: number): Promise <{id: number}> {

      const user = this.users.findIndex (user => user.id === id );

      if (user === -1) {

        throw new Error ("User not found");
    
      }

      this.users.splice (user, 1);

      return {id};

    }

    async getPaginatedUsers (page: number = 1, limit: number = 5): Promise<{

      users: Omit<User, "password">[];
      totalUsers: number;
      totalPages: number;
      currentPage: number;

    }> {
          const totalUsers = this.users.length;
          const totalPages = Math.ceil (totalUsers / limit);
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
  
          console.log ("Repository: Total Users =", totalUsers);
          console.log (`Repository: StartIndex=${startIndex}, EndIndex=${endIndex}`);
  
          const users = this.users.slice (startIndex, endIndex).map (({ password, ...user }) => user);
  
          console.log ("Repository: Paginated Users =", users);
  
          return {
            
            users,
            totalUsers,
            totalPages,
            currentPage: page,

          };

        }


    async logUser (login: Login): Promise <User | string> {

      if (!login.email || !login.password) {
        
        throw new BadRequestException ("Email and password are required");

      }
    
      const user = this.users.find (user => user.email === login.email);
    
      if (!user || login.password !== user.password) {
    
        throw new BadRequestException ("Email or password are incorrect");
    
      } else {          
                
        return user;
    
      }
    
    }

}
  
  
