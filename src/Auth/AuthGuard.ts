

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

export function validateRequest(request: Request): boolean {
    const authHeader = request.headers['authorization'];
  
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }
  
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      throw new UnauthorizedException('Authorization header format is invalid');
    }
  
    const [scheme, credentials] = parts;
  
    if (scheme !== 'Basic') {
      throw new UnauthorizedException('Authorization header does not use the "Basic" scheme');
    }
  
    const credentialsParts = credentials.split(':');
    if (credentialsParts.length !== 2) {
      throw new UnauthorizedException('Authorization header is missing email or password');
    }
  
    return true;
  }



@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    if (!request) {
      throw new UnauthorizedException('Request object is undefined');
    }
    if (!validateRequest(request)) {
      throw new UnauthorizedException('Invalid authorization header');
    }
    return true;
  }
}


