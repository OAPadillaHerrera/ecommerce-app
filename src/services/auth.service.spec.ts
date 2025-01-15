

/*

 * Jest Test Suite for AuthService.
 * 
 * This file contains unit tests for the AuthService using Jest and TypeORM.
 * It includes mock implementations of dependencies such as UsersRepository
 * and UsersService. The tests focus on ensuring functionality for user
 * creation with encrypted passwords and initialization of the AuthService.
 
*/

import { Test } from "@nestjs/testing"; // Import testing module from NestJS.
import { AuthService } from "../Auth/Auth.service"; // Import AuthService to be tested.
import { UsersRepository } from "../Users/users.repository"; // Mocked UsersRepository.
import { JwtService } from "@nestjs/jwt"; // JWT service for token generation.
import { UsersService } from "../Users/Users.service"; // Mocked UsersService.
import { Users } from "../Users/users.entity"; // Users entity definition.
import * as bcrypt from 'bcrypt'; // Ensure bcrypt is imported for password hashing.

describe ("authService", () => {

    let authService: AuthService; // Instance of AuthService.

    const mockUser: Omit<Users, "id"> = {

        email: "user6@example.com", // Mock user email.
        name: "Fito Paez", // Mock user name.
        address: "888 Elm St", // Mock user address.
        phone: 600654344, // Mock user phone.
        country: "Portugal", // Mock user country.
        city: "Lisboa", // Mock user city.
        password: "Password123!", // Mock user password (plaintext, to be hashed later).
        isAdmin: "t", // Mock user admin status.
        roles: [], // Mock user roles (empty array).
        orders: [] // Mock user orders (empty array).

    };

    beforeEach (async () => {

        const mockUsersRepository: Partial<UsersRepository> = {

            logUser: () => Promise.resolve (undefined), // Mock implementation of logUser method.

            createUser: (user: Omit<Users, "id">): Promise<Users> => Promise.resolve ({

                ...user, // Copy mock user data.
                id: "1234fs-234sd-24csf-34sdfg", // Mocked user ID.

            })
        };

        const mockUsersService = {

            findUserByEmail: () => Promise.resolve (null), // Mocked method to find user by email.

            createUser: async (user: Omit<Users, "id">): Promise<Users> => {

                // Simulate password hashing
                const hashedPassword = await bcrypt.hash (user.password, 10); // Hash password with bcrypt.

                return {

                    ...user, // Copy mock user data.
                    password: hashedPassword, // Replace plaintext password with hashed password.
                    id: "1234fs-234sd-24csf-34sdfg", // Mocked user ID.

                };

            }

        };

        const module = await Test.createTestingModule ({

            providers: [

                AuthService, // Provide AuthService for testing.
                JwtService, // Provide JwtService as a dependency.

                {
                    provide: UsersRepository, // Provide mocked UsersRepository.
                    useValue: mockUsersRepository,
        
                },
                {

                    provide: UsersService, // Provide mocked UsersService.
                    useValue: mockUsersService,

                },

            ],

        }).compile ();

        authService = module.get<AuthService>(AuthService); // Retrieve instance of AuthService.

    });

    it ("Create an instance of AuthService", async () => {

        expect (authService).toBeDefined(); // Ensure AuthService is defined.

    });

    it ("signUp () a new user with an encrypted password", async () => {

        const user = await authService.signUp (mockUser); // Call signUp method with mock user.
        expect (user).toBeDefined (); // Ensure the returned user is defined.
        expect (user.password).not.toEqual (mockUser.password); // Ensure password is hashed and not plaintext.

    });
    
});




