import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../config/config.service';
import{ GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public sidebarOpened = false;
  message:string;
  region = GlobalConstants.region.toUpperCase();
  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    console.log(this.sidebarOpened);
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    }
    else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }
  constructor(private configService :ConfigService,config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
  }
  ngOnInit() {
    this.configService.currentMessage.subscribe(message => this.message = message)
    //console.log(this.message);
  }

  logout(){

    this.deleteCookie("token");
    this.deleteCookie("isLoggedIn");
    this.deleteCookie("name");
    this.deleteCookie("peaName");
    this.deleteCookie("peaCode");
    this.deleteCookie("peaEng");
    window.location.href ="https://sso2.pea.co.th/realms/pea-users/protocol/openid-connect/logout?redirect_uri=http://localhost:4200/login"
    // this.authService.logout();
  }
    deleteCookie(name: string,) {
    document.cookie = name +`=; Path=/; Expires=Tue, 22 Aug 2023 12:00:00 UTC;`;
  }
}
