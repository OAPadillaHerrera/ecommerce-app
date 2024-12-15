

/**
 * This file defines the `Role` enumeration, which represents the 
 * different roles available in the application.
 * 
 * Each role is assigned a unique string value to facilitate 
 * role-based access control (RBAC) and authorization throughout the system.
 */

export enum Role {

    /**
     * `User` represents a standard user role with limited permissions.
     * Typical actions include viewing and interacting with content 
     * specific to their account.
     */
    User = "user",

    /**
     * `Admin` represents an administrator role with elevated permissions.
     * Admins can manage users, settings, and perform high-level operations.
     */

    Admin = "admin",

}
