import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  users?: Array<{id: number, userName: string}>;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('https://localhost:5000/api/users').subscribe({
      next: response => this.users = response as Array<{id: number, userName: string}>,
      error: error => console.error(error),
      complete: () => console.info('Completed')
    })
  }
}
