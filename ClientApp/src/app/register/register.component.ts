import { Type } from '@angular/compiler/src/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { DatepickerModule } from 'ngx-bootstrap/datepicker'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private toaster: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
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
      dateOfBirth:
        new DatepickerModule(), 
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
    console.log(this.registerForm.value);
    //this.accountService.register(this.model).subscribe(response => {
    //  console.log(response);
    //}, error => {
    //  console.log(error);
    //  this.toaster.error(error.error);
    //});
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true };
    }
  }
}
