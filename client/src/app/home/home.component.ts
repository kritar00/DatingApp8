import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users?: Array<{ id: number; userName: string }>;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getUser();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUser() {
    this.http.get('https://localhost:5000/api/users').subscribe({
      next: (response) =>
        (this.users = response as Array<{ id: number; userName: string }>),
      error: (error) => this.toastr.error(error.error),
      complete: () => console.info('Completed'),
    });
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
