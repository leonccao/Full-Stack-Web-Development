import { Component } from "@angular/core";
import { TNSFontIconService } from 'nativescript-ngx-fonticon';

@Component({
    selector: 'drawer-content',
    templateUrl: './shared/drawer/drawer.component.html',
})
export class DrawerComponent {

    constructor(private fonticon: TNSFontIconService) { }

}