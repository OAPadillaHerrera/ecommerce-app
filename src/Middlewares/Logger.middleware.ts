

import { Injectable, NestMiddleware  } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable ({})

export class LoggerMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {

        /*console.log (`Estás ejecutando un método ${req.method} en la ruta ${req.url}`,*/
        const currentDate = new Date().toISOString(); // Fecha y hora en formato ISO
        console.log(`[${currentDate}] - Método: ${req.method} | Ruta: ${req.url}`);

        next ();

    }

}

/*export function loggerGlobal (req: Request, res: Response, next: NextFunction) {

    console.log (`Estás ejecutando un método ${req.method} en la ruta ${req.url}`,

    );

    next ();

}*/  

