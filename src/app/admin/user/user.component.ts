import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any[];
  canGetUsers = true;

  constructor() { }

  ngOnInit() {
    if (this.canGetUsers) {
      this.getUsers().then(users => this.users = users).catch(e => console.log(e.message));
    }
  }

  async getUsers() {
    return [
      {
        name: 'dave', email: '223344@qq.com'
      },
      {
        name: 'nick', email: 'nick@qq.com'
      }
    ];
  }
}
