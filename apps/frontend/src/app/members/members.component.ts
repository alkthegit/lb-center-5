import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'center5-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getMembers().subscribe(members => {
      this.members = members;
    });
  }

}
