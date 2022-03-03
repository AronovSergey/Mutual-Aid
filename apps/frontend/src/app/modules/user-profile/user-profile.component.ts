import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '@mutual-aid/interfaces';
import { UserService } from '@mutual-aid/frontend-core/services';

@Component({
  selector: 'mutual-aid-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public user: IUser;
  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        const userId = params['id'];
        this.userService.getUserById(userId).subscribe(
          (user: IUser) => {
            this.user = user;
          }
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
