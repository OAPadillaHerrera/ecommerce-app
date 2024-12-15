

/**
 * This file defines the `User` interface, which represents 
 * the structure of a user entity in the application. 
 * 
 * The `User` interface includes fields for personal, 
 * contact, and authentication information. It is used 
 * throughout the application to ensure consistency in 
 * how user data is managed and accessed.
 */

export interface User {

    id: number; // Unique identifier for the user.
    email: string; // User's email address, commonly used for login and notifications.
    name: string; // Full name of the user.
    password: string; // Hashed password for secure authentication.
    address: string; // User's residential address.
    phone: string; // Contact phone number of the user.
    country: string; // Country of residence.
    city: string; // City of residence.
    roles: string[];

}
