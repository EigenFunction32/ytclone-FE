import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../_services/token-storage.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {VideoDto} from "../video-dto";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historyVideos: Array<VideoDto> = [];
  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('login');
    }
    this.userService.getUserInfo().subscribe(userId => {
      this.userService.getUserHistory(userId).subscribe( response => {
        this.historyVideos = response;
      })
    })

  }


}
