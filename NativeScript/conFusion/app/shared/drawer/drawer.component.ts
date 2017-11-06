import { Component } from "@angular/core";
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { login, LoginResult } from "ui/dialogs";
import { getString, setString } from "application-settings";

@Component({
    selector: 'drawer-content',
    templateUrl: './shared/drawer/drawer.component.html',
})
export class DrawerComponent {

    constructor(private fonticon: TNSFontIconService) { }
    
    displayLoginDialog() {
        let options = {
            title: "Login",
            message: 'Type Your Login Credentials',
            userName: getString("userName", ""),
            password: getString("password",""),
            okButtonText: "Login",
            cancelButtonText: "Cancel"
        }

        login(options)
            .then((loginResult: LoginResult) => {
                setString("userName", loginResult.userName);
                setString("password", loginResult.password);
            },
            () => { console.log('Login cancelled'); 
        });
    }

}