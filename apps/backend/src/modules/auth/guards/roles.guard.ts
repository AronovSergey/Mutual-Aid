import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '@mutual-aid/interfaces';
import { UserService } from '../../user/service/user.service';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject(forwardRef(() => UserService))
        private userService: UserService, 
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        
        const request = context.switchToHttp().getRequest();
        const user: IUser = request.user;

        return this.userService.findOne(user.id).pipe(
            map((user: IUser) => {
                const hasPermission = roles.includes(user.role);
                return user && hasPermission;
            })
        )
    }
}