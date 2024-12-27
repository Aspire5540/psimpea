import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//import { ILogin } from '../login';
import { AuthService } from './config/auth.service';
import { ConfigService } from './config/config.service';
import { GlobalConstants } from './common/global-constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'star-admin-angular';
  returnUrl: string;
  islogin : boolean;
  region =GlobalConstants.regionThai[GlobalConstants.region];
  authUrl ='https://sso2.pea.co.th/realms/pea-users/protocol/openid-connect/auth?client_id=pea-psim&redirect_uri='+window.location.origin+'&response_type=code&scope=openid';


  constructor(private configService :ConfigService,private formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router, public authService: AuthService) { }


  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/opsa68';
    const codeParams = window.location.href.split("code=")[1];
   
    // const token = GetCookie("token");
   
    if (codeParams === undefined) {
      window.location.href = this.authUrl;
      // console.log(window.location.href);
      }
      else{
        this.configService.getToken(codeParams).subscribe((data=>{
          console.log(data);
          if (data["status"]===1){
            // localStorage.setItem('isLoggedIn', "true");
            // localStorage.setItem('token', data["access_token"]);
            document.cookie = `token=${data["access_token"]}`;
            document.cookie = `isLoggedIn="true"`;
            this.configService.getUserProfile(data["access_token"]).subscribe(data=>{
              
              // localStorage.setItem('name', data['first_name']);
              document.cookie = `name=${data["first_name"]}`;
              // localStorage.setItem('peaName', data['business_area_name']);
              document.cookie = `peaName=${data["business_area_name"]}`;
              // localStorage.setItem('peaCode', data['pea_code']);
              document.cookie = `peaCode=${data["pea_code"]}`;
              this.configService.changeMessage();
              this.configService.postdata2('rdpea.php',{ peaCode: data['pea_code']}).subscribe(pea=>{
                // localStorage.setItem('peaEng', pea['data']["peaEng"]);
                document.cookie = `peaEng=${pea['data']["peaEng"]}`;
                this.configService.changeMessage();   
              });
              this.router.navigate([this.returnUrl]);




            })
          }
          else{
            window.location.href = this.authUrl;
          }
        }))
      }
    this.configService.changeMessage();
    
  }
}
