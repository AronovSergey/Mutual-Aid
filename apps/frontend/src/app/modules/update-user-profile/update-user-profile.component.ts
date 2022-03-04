import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, UserService } from '@mutual-aid/frontend-core/services';
import { IUser } from '@mutual-aid/interfaces';

@Component({
  selector: 'mutual-aid-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss']
})
export class UpdateUserProfileComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      name: [{ value: null }, [Validators.required]],
      username: [{ value: null }, [Validators.required]],
    });

    const activeUserId: number | undefined = this.authService.getActiveUser()?.id;
    if (activeUserId) {
      this.userService.getUserById(String(activeUserId)).subscribe(
        (user: IUser) => {
          this.form.patchValue({
            id: user.id,
            name: user.name,
            username: user.username,
          });
        }
      );
    }
  }

  public update(): void {
    this.userService.updateUser(this.form.getRawValue()).subscribe();
  }

}
