import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { FavoriteService } from '../services/favorite.service';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { Toasty } from 'nativescript-toasty';
import { action } from "ui/dialogs";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { CommentComponent } from '../comment/comment.component';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
    moduleId: module.id,
  templateUrl: './dishdetail.component.html'
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  commentListHeight: number;
  favorite: boolean = false;

  constructor(private favoriteservice: FavoriteService,
    private fonticon: TNSFontIconService,
    private dishservice: DishService,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private modalService: ModalDialogService, 
    private vcRef: ViewContainerRef,
    @Inject('BaseURL') private BaseURL) { }

    ngOnInit() {
      this.route.params
        .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
        .subscribe(dish => { 
          this.dish = dish;
          this.commentListHeight = this.dish.comments.length * 100;
          this.favorite = this.favoriteservice.isFavorite(this.dish.id);
          this.numcomments = this.dish.comments.length;
      
          let total = 0;
          this.dish.comments.forEach(comment => total += comment.rating);
            this.avgstars = (total/this.numcomments).toFixed(2);
        },
        errmess => { this.dish = null; this.errMess = <any>errmess; });
    }
      
    toggleFavorites() {
      if (!this.favorite) {
        console.log('Adding to Favorites', this.dish.id);
        this.favorite = this.favoriteservice.addFavorite(this.dish.id);      
        const toast = new Toasty("Added Dish "+ this.dish.id + " to favorites", "short", "bottom");
        toast.show();
      } else {
        console.log('Deleting from Favorites', this.dish.id);
        this.favorite = !this.favoriteservice.deleteFavorite(this.dish.id);
        const toast = new Toasty("Deleted Dish "+ this.dish.id + " from favorites", "short", "bottom");
        toast.show();
      }
    }

  goBack(): void {
    this.routerExtensions.back();
  }

  createAction() {
    let options = {
      title: "What to do ?",
      cancelButtonText: "Cancel",
      actions: ["Add/Delete a Favorite", "Add comment"]
    };
    action(options).then(result => {
      if (result === "Add/Delete a Favorite") {
        this.toggleFavorites();
      } else {  
        console.log('Adding comment');
        this.createModalView();
      }
    });
  }

  createModalView() {
    let options: ModalDialogOptions = {
        viewContainerRef: this.vcRef,
        fullscreen: false
    };
    
    this.modalService.showModal(CommentComponent, options)
        .then((result: Comment) => {
          this.dish.comments.push(result);
          this.commentListHeight += 100;
          this.numcomments = this.dish.comments.length;
          let total = 0;
          this.dish.comments.forEach((comment: Comment) => total += comment.rating);
          this.avgstars = (total/this.numcomments).toFixed(2);
        });
  }
}