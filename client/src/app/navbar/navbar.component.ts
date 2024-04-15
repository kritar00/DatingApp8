import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { IUserModel } from '../_models/user';

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

  constructor(public accountService: AccountService) { }
  ngOnInit(): void {
  }

  login(): void {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.error(error)
    });
  }

  logout(): void {
    this.accountService.logout();
  }
}
