

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request) {
      throw new UnauthorizedException('Request object is undefined');
    }

    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      throw new UnauthorizedException('Authorization header format is invalid');
    }

    const [scheme, token] = parts;

    if (scheme !== 'Bearer') {
      throw new UnauthorizedException('Authorization header does not use the "Bearer" scheme');
    }

      try {
      // Verifica el token
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    
      // Debug para verificar que el payload tiene 'exp'
      console.log('Payload:', payload);
    
      // Adjuntar el payload al request
      request['user'] = {
        ...payload,
        exp: payload.exp, // Adjuntar el tiempo de expiración
      };
    
      // Debug para verificar que request['user'] se ha asignado correctamente
      console.log('Request user:', request['user']);
    
      return true;
    } catch (error) {
      // Manejo de errores como estaba antes
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token is invalid');
      } else {
        throw new UnauthorizedException('An error occurred while verifying the token');
      }
    }
      
  }

}



