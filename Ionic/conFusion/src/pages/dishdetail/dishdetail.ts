import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Platform, ActionSheetController } from 'ionic-angular';
import { CommentPage } from '../../pages/comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,
    private platform: Platform,
    private actionsheetCtrl: ActionSheetController,
    private modalctrl: ModalController) {
      this.dish = navParams.get('dish');
      this.favorite = favoriteservice.isFavorite(this.dish.id);
      this.numcomments = this.dish.comments.length;
      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating );
      this.avgstars = (total/this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000}).present();
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Dish Detail',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Add to Favorties',
          handler: () => {
            this.addToFavorites();
          }
        },
        {
          text: 'Add a Comment',
          handler: () => {
            this.openModal();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  openModal() {
    let modal = this.modalctrl.create(CommentPage);
    modal.present();
    modal.onDidDismiss((addComment) => {
      if (addComment)
        this.dish.comments.push(addComment);
      });
  }
}
