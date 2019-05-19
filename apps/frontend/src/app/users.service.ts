import { Injectable } from '@angular/core';
import { UsersStorageService } from './users-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private usersStorageService: UsersStorageService) { }

  getMembers() {
    return this.usersStorageService.getUsers();
  }
}