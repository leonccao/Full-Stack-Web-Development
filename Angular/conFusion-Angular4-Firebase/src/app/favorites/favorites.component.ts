import { Component, OnInit, Inject } from '@angular/core';
import { Favorite, FavDish } from '../shared/favorite';
import { FavoriteService } from '../services/favorite.service';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class FavoritesComponent implements OnInit {

  favorites = { user: "", dishes: []};
  favDishes: FavDish[];
  delete: boolean;
  errMess: string;
  favorite: FavDish

  constructor(private favoriteService: FavoriteService,
    private dishservice: DishService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.favoriteService.getFavorites()
      .subscribe(favorites => {
        this.favorites = { user: "", dishes: []};        
        favorites.forEach(favorite => {
          this.dishservice.getDish(favorite.dish)
            .subscribe(dish => {
              this.favorites.dishes.push(dish);
            })      
        })
      },
      errmess => this.errMess = <any>errmess);
  }

  deleteFavorite(id: string) {
    this.favoriteService.deleteFavorite(id)
      .then(() => {
        this.favoriteService.getFavorites()
        .subscribe(favorites => {
          this.favorites = { user: "", dishes: []};        
          favorites.forEach(favorite => {
            this.dishservice.getDish(favorite.dish)
              .subscribe(dish => {
                this.favorites.dishes.push(dish);
              })
          })
        })
      },
      errmess => this.errMess = <any>errmess);
    this.delete = false;
  }

}
