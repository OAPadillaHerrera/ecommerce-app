

/**
 
 * This interface defines the structure of login data required for authentication.
 * 
 * The `Login` interface ensures that objects adhere to a standard format 
 * containing the user's email and password, which are essential for the login process.
 
*/

export interface Login {

    email: string; // User's email address. This should be a valid email format (e.g., "example@example.com").
    password: string; // User's password. Typically, this is the raw input but should be hashed before storage.

}
