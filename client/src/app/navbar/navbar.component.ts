import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { IUserModel } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: IUserModel = {
    username: '',
    password: ''
  }

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
  }

  login(): void {
    this.accountService.login(this.model).subscribe({
      next: response => {
        this.router.navigateByUrl('/members');
      },
      error: error => this.toastr.error(error.error)
    });
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
