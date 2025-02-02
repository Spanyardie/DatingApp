import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      username: [
        '',
        Validators.required
      ],
      gender: [
        'male'
      ],
      knownAs: [
        '',
        Validators.required
      ],
      dateOfBirth: [
        '',
        Validators.required
      ],
      city: [
        '',
        Validators.required
      ],
      country: [
        '',
        Validators.required
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)]
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8), this.matchValues('password')]
      ]
    });
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
        this.validationErrors = error;
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true };
    }
  }
}
