import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { request } from 'express';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = request.headers.authorization;
    const hasBooleanProperty = request.body.isAdmin // replace with the actual property name

    if (!token || !hasBooleanProperty) {
      return false;
    }

    // Verify token and check boolean property
    // Example using JWT
    try {
      const decodedToken = jwt.verify(token, 'secret-key');
      const { isAdmin} = decodedToken;
      return isAdmin === true;
    } catch (err) {
      return false;
    }
 
  }
}

