import { Component, OnInit, Inject } from '@angular/core';
import { Favorite } from '../shared/favorite';
import { FavoriteService } from '../services/favorite.service';
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

  favorites: Favorite;
  delete: boolean;
  errMess: string;

  constructor(private favoriteService: FavoriteService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.favoriteService.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = <any>errmess);
    console.log(this.favorites);
  }

  deleteFavorite(id: string) {
    console.log('Deleting Dish ' + id);
    this.favoriteService.deleteFavorite(id)
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = <any>errmess);
    this.delete = false;
  }

}
