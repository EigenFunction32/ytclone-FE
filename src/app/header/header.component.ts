import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../_services/token-storage.service";
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = !!this.tokenStorageService.getToken();
  }

  logOut() {
    this.authService.clearToken().subscribe(data => {
      this.tokenStorageService.signOut();
      location.reload();

    });
  }

}

