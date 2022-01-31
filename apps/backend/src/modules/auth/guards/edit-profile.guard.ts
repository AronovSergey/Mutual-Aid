import { Injectable, CanActivate, Inject, forwardRef, ExecutionContext } from "@nestjs/common";
import { map, Observable } from "rxjs";

import { IUser } from "@mutual-aid/interfaces";
import { UserService } from "../../user/service/user.service";

@Injectable()
export class EditProfileGuard implements CanActivate {

    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const params = request.params;
        const user: IUser = request.user;
        
        return this.userService.findOne(user.id).pipe(
            map((user: IUser) => {
                let hasPermission = false;

                if(user.id === Number(params.id)) {
                    hasPermission = true;
                }

                return user && hasPermission;
            })
        );
    }
}