import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { FavoriteService } from '../services/favorite.service';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
    moduleId: module.id,
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  comment: Comment;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(private favoriteservice: FavoriteService,
    private fonticon: TNSFontIconService,
    private dishservice: DishService,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    @Inject('BaseURL') private BaseURL) { }

    ngOnInit() {
      this.route.params
        .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
        .subscribe(dish => { 
          this.dish = dish;
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
      } else {
        console.log('Deleting from Favorites', this.dish.id);
        this.favorite = !this.favoriteservice.deleteFavorite(this.dish.id);
      }
    }

  goBack(): void {
    this.routerExtensions.back();
  }
}