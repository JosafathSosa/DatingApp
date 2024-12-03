import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgIf, TitleCasePipe } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {CustomErrorHandlerService} from "ngx-metrics-web"

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    BsDropdownModule,
    RouterLink,
    RouterLinkActive,
    TitleCasePipe,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  accountService = inject(AccountService);
  private customErrorHandler = inject(CustomErrorHandlerService)
  private router = inject(Router);
  private toaster = inject(ToastrService);
  model: any = {};

  login(): void {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('members');
      },
      error: (error) => {
        console.log(error);
        
        this.customErrorHandler.handleError(error)
        this.toaster.error(error.error);
      },
    });
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
