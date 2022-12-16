import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../_services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.isAuthenticated = !!this.tokenStorageService.getToken();
  }

  login() {
    this.router.navigateByUrl('login');
  }

  logoff() {
    this.tokenStorageService.signOut();
  }
}

