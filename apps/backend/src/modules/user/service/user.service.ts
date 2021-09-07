import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { IUser } from '@mutual-aid/interfaces';
import { UserEntity } from '../user.entity';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    create(user: IUser): Observable<IUser> {
        return from(this.userRepository.save(user));
    }

    findOne(id: number): Observable<IUser> {
        return from(this.userRepository.findOne(id));
    }

    findAll(): Observable<IUser[]> {
        return from(this.userRepository.find());
    }

    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    updateOne(id: number, user: IUser): Observable<any> {
        return from(this.userRepository.update(id, user));
    }
}
