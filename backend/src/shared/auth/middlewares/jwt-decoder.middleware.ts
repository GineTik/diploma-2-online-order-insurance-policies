
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { USER_PAYLOAD } from '../constants/auth.constants';

@Injectable()
export class JwtDecoratorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractToken(req);

    if (!token) {
      return next();
    }

    try {
      const payload = jwt.decode(token);
      req[USER_PAYLOAD] = payload;
      next();
    } catch (err) {
      next();
    }
  }

  private extractToken(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const [, token] = authHeader.split(' ');
    return token;
  }
}
