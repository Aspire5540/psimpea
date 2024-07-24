import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetCookie } from './common/cookies';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;  
    return this.verifyLogin(url);
}

verifyLogin(url) : boolean{
    if(!this.isLoggedIn()){
        this.router.navigate(['/login']);
        this.router.navigate(['login'], { queryParams: { returnUrl: url }});
        return false;
    }
    else if(this.isLoggedIn()){
        return true;
    }
}
public isLoggedIn(): boolean{
    let status = false;
    if( GetCookie('isLoggedIn').search("true")>-1){
      status = true;
    }
    else{
      status = false;
    }
    console.log("stat",status)
    return status;
}
}
