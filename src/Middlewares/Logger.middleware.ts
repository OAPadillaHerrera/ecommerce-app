

/**
 * This file defines the `LoggerMiddleware`, which is responsible for 
 * logging incoming HTTP requests. It captures the request method, route, 
 * and timestamp, providing a simple logging solution for debugging purposes.
 */

import { Injectable, NestMiddleware } from "@nestjs/common"; // Import NestJS decorators and middleware interface.
import { NextFunction, Request, Response } from "express"; // Import types for Express requests, responses, and next function.

@Injectable ({})

export class LoggerMiddleware implements NestMiddleware {

    use (req: Request, res: Response, next: NextFunction) {

    const currentDate = new Date ().toISOString (); // Generate current date and time in ISO format.

    console.log (`[${currentDate}] - Method: ${req.method} | Route: ${req.url}`); // Log the request method and route before proceeding.

    next (); // Pass control to the next middleware or handler.

    console.log (`[${currentDate}] - After calling next ()`);  // Log after `next ()` has been called.

  }

}
