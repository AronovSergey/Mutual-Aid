import { catchError, Observable, tap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Pagination } from 'nestjs-typeorm-paginate';
import { IUser } from '@mutual-aid/interfaces';
import { HttpService } from '@mutual-aid/frontend-core/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: HttpService) {}

  getUserById(id: string): Observable<IUser> {
    return this.httpService.getUserById(id);
  }

  getAllUsers(page: number, numberOfItemsPerPage: number, username?: string): Observable<Pagination<IUser>> {
    return this.httpService.getAllUsers(page, numberOfItemsPerPage, username).pipe(
      tap((users: Pagination<IUser>) => users),
      catchError((err) => throwError(err))
    );
  }
}
