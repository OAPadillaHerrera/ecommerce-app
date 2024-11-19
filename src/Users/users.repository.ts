

import {Injectable} from "@nestjs/common";

@Injectable ()

export class UsersRepository {

    private users = [

      {

        id: 1,
        email: "user1@example.com",
        name: "John Doe",
        password: "password123",
        address: "123 Main St",
        phone: "+34 600123456",
        country: "Spain",
        city: "Madrid",

      },

      {

        id: 2,
        email: "user2@example.com",
        name: "Jane Smith",
        password: "password456",
        address: "456 Elm St",
        phone: "+34 600654321",
        country: "Spain",
        city: "Barcelona",

      },

      {

        id: 3,
        email: "user3@example.com",
        name: "Bob Johnson",
        password: "password789",
        address: "789 Pine St",
        phone: "+34 600789123",
        country: "Spain",
        city: "Galicia",

      },

    ];
  
    /* Obtener todos los usuarios*/
    async getUsers() {
      return this.users;

    } 

}
