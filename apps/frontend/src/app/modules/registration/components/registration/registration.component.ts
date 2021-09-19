import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@mutual-aid/frontend-core/services';
import { IUser } from '@mutual-aid/interfaces';
import { CustomValidators } from '@mutual-aid/frontend-core';

@Component({
  selector: 'mutual-aid-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(3),
        CustomValidators.passwordContainsNumber
      ]],
      passwordConfirm: [null, [
        Validators.required
      ]]
    }, {
      validators: CustomValidators.passwordsMatch,
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (user: IUser) => {
          if (user) {
            this.router.navigate(['login']);
          }
        }
      )
    }
  }
}
