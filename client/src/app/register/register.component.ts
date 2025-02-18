import { Component, inject, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { CustomErrorHandlerService } from 'ngx-metrics-web';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  // usersFromHomeComponent = input.required<any>();
  private customErrorHandlerService = inject(CustomErrorHandlerService);
  cancelRegister = output<boolean>();
  private toaster = inject(ToastrService);
  model: any = {};

  registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
    });
  }

  register(): void {
    console.log(this.registerForm.value);
  }
  cancel(): void {
    this.cancelRegister.emit(false);
  }
}
