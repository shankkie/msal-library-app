import { AuthenticationResult } from '.pnpm/@azure+msal-common@5.0.1/node_modules/@azure/msal-common';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  

  constructor(private msalService: MsalService) { }

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then( (res) => {
      if(res !== null && res.account !== null) {
        this.msalService.instance.setActiveAccount(res.account);
      }
    })
  }

  isLoggedIn(): boolean {
    console.log(this.msalService.instance.getActiveAccount());
    return this.msalService.instance.getActiveAccount() !== null;
  }

  logIn() {
    this.msalService.loginRedirect();
    // this.msalService.loginPopup().subscribe( (res: AuthenticationResult) => {
    //   console.log(res)
    //   this.msalService.instance.setActiveAccount(res.account);
    // })
  }

  logOff() {
    this.msalService.instance.logout();
  }


}
