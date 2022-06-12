import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '@core/authentication/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  constructor(private authServ: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    this.signUp();
  }

  /**
   * The function creates a form group with two controls, email and password, and assigns the form
   * group to the form property of the component
   */
  createForm() {
    this.form = this.fb.group({
      email: ['ab@a.com', [Validators.required]],
      password: ['123456789', [Validators.required]],
    });
  }

  /**
   * The function returns the value of the form
   * @returns The form value
   */
  get f() {
    return this.form.value;
  }

  /**
   * The signIn() function calls the signIn() function in the authService.ts file, passing in the email
   * and password values from the form
   */
  signIn() {
    this.authServ.signIn(this.f.email, this.f.password);
  }

  /**
   * The signUp() function calls the signUp() function in the authService.ts file, passing in the email
   * and password values from the form
   */
  signUp() {
    this.authServ.signUp(this.f.email, this.f.password);
  }
}
