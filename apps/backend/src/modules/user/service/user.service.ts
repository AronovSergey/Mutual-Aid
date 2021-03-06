import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  UpdateResult,
  DeleteResult,
  FindManyOptions,
  ILike,
} from 'typeorm';
import { from, Observable, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { IUser } from '@mutual-aid/interfaces';
import { User } from '../user.entity';
import { AuthService } from '../../auth/services/auth.service';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { UserRole } from '@mutual-aid/enums';

@Injectable()
export class UserService {
  constructor(
    private authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(user: IUser): Observable<IUser> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((password: string) => {
        user.password = password;
        user.role = UserRole.USER;
        return from(this.userRepository.save(user)).pipe(
          map((user: IUser) => {
            delete user.password;
            return user;
          }),
          catchError((err) => throwError(err))
        );
      })
    );
  }

  findOne(id: number): Observable<IUser> {
    return from(this.userRepository.findOne(id));
  }

  findByMail(email: string): Observable<IUser> {
    return from(this.userRepository.findOne({ email }));
  }

  findAll(
    options: IPaginationOptions,
    username = ''
  ): Observable<Pagination<IUser>> {
    const findManyOptions: FindManyOptions = {
      order: { id: 'ASC' },
      where: { username: ILike(`%${username}%`) },
    };
    return from(paginate<IUser>(this.userRepository, options, findManyOptions));
  }

  deleteOne(id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }

  updateOne(id: number, user: IUser): Observable<UpdateResult> {
    delete user.email;
    delete user.password;
    delete user.role;

    return from(this.userRepository.update(id, user));
  }

  updateRole(id: number, user: IUser): Observable<UpdateResult> {
    return from(this.userRepository.update(id, user));
  }

  login(user: IUser): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: IUser) => {
        return this.authService
          .generateJWT(user)
          .pipe(map((jwt: string) => jwt));
      })
    );
  }

  validateUser(email: string, password: string): Observable<IUser> {
    return from(
      this.userRepository.findOne({
        where: { email },
        select: ['id', 'name', 'username', 'email', 'password', 'role'],
      })
    ).pipe(
      switchMap((user: IUser) => {
        if (user) {
          return this.authService
            .comparePasswords(password, user.password)
            .pipe(
              map((match: boolean) => {
                if (match) {
                  delete user.password;
                  return user;
                } else {
                  throw Error('Wrong Credentials');
                }
              })
            );
        } else {
          throw Error('Wrong Credentials');
        }
      })
    );
  }
}
