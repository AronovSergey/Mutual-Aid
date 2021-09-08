import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { from, Observable } from 'rxjs';
import { IUser } from '@mutual-aid/interfaces';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) { }

    generateJWT(user: IUser): Observable<string> {
        return from(this.jwtService.signAsync({ user }));
    }

    hashPassword(password: string): Observable<string> {
        return from(bcrypt.hash(password, 12))
    }

    comparePasswords(newPassword: string, passwordHash: string): Observable<boolean> {
        return from(bcrypt.compare(newPassword, passwordHash))
    }
}
