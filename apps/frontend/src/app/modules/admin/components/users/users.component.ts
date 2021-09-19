import { Component, OnInit } from '@angular/core';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '@mutual-aid/frontend-core/services';
import { IUser } from '@mutual-aid/interfaces';

@Component({
  selector: 'mutual-aid-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: Pagination<IUser>;
  public displayColumns = ['id', 'name', 'username', 'email', 'role'];
  public pageEvent: PageEvent;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers(1, 10).subscribe((users: Pagination<IUser>) => this.users = users);
  }

  onPaginateChange(event: PageEvent){
    const page = event.pageIndex + 1;
    const size = event.pageSize;
    this.userService.getAllUsers(page, size).subscribe((users: Pagination<IUser>) => this.users = users);
  }
}
