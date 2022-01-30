import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static passwordContainsNumber(
    control: AbstractControl
  ): ValidationErrors | null {
    const regex = /\d/;

    if (!control.value || !regex.test(control.value)) {
      return { passwordInvalid: true };
    }
    return null;
  }

  static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if (!password || !passwordConfirm || password !== passwordConfirm) {
      return { passwordsNotMatching: true };
    }
    return null;
  }
}
