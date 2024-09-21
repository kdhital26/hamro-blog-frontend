import { Component, OnInit } from '@angular/core';
import { UserList } from '../models/userlist-model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public userList: UserList[] = [];
  public showLoader = false;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUser()
    .subscribe((result: any) => {
      const {users} = result;
      console.log(users, 'results here');
      this.userList =  users;

    })
  }

  delete(data: any) {

  }

  editBlog(data: any, index: number) {

  }

}
