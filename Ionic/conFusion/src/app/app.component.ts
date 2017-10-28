import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { MenuPage } from '../pages/menu/menu';
import { ContactPage } from '../pages/contact/contact';
import { FavoritesPage } from '../pages/favorites/favorites';
import { ReservationPage } from '../pages/reservation/reservation';
import { CommentPage } from '../pages/comment/comment';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  loading: any = null;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private network: Network) {
      this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'About', icon: 'information-circle', component: AboutPage },
      { title: 'Menu', icon: 'list-box', component: MenuPage },
      { title: 'Contact Us', icon: 'contact', component: ContactPage },
      { title: 'My Favorites', icon: 'heart', component: FavoritesPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.network.onDisconnect().subscribe(() => {
        if (!this.loading) {
          this.loading = this.loadingCtrl.create({
            content: 'Network Disconnected'
          });
          this.loading.present();
        }
      });

      this.network.onConnect().subscribe(() => {

        // We just got a connection but we need to wait briefly
        // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            console.log('we got a wifi connection, woohoo!');
          }
        }, 3000);
        if (this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openReserve() {
    let modal = this.modalCtrl.create(ReservationPage);
    modal.present();
  }

  openLogin() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }
}
