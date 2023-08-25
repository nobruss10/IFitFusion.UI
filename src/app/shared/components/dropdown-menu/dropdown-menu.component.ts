import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/auth/user/user.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {
  currentLanguage: string;
  router: Router;
  user$ = this.userService.getUser();

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      suc => console.log(suc),
      erro => console.log(erro)
    );
  }
  logout() {
    this.userService.logout();
  }

}
