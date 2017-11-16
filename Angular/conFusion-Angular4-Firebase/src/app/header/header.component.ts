
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: string = undefined;

  constructor(public dialog: MatDialog,
    private authService: AuthService ) { 
    }

  ngOnInit() {
    this.authService.getAuthState()
    .subscribe((user) => {
      if (user) {
        // User is signed in.
        console.log("Logged In ", user.email);
        this.username = user.displayName ? user.displayName: user.email;
      } else {
        console.log("Not Logged In");
        this.username = undefined;
      }
    });
  }

  openLoginForm() {
    let loginRef = this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
  }

  logOut() {
    this.username = undefined;
    this.authService.logOut();
  }

}