import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  @ViewChild('cform') commentFormDirective;

  dish: Dish;
  dishIds: String[];
  prev: String;
  next: String;
  errMess: string;
  visibility = 'shown';
  favorite: boolean = false;

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'comment': {
      'required':      'Comment is required.'
    }
  };

  commentForm: FormGroup;

  constructor(private dishservice: DishService,
    private favoriteService: FavoriteService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {

    this.createForm();

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(params['id']); })
      .subscribe(dish => { 
          this.dish = dish;
          this.dishservice.getComments(this.dish._id)
          .subscribe(comments => this.dish.comments = comments);
          this.setPrevNext(dish._id); 
          this.visibility = 'shown';
          this.favoriteService.isFavorite(this.dish._id)
            .then(value =>{ 
              this.favorite = value;
              console.log("Dishdetail favorite ", this.favorite);              
            });
        },
        errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: String) {
    if(this.dishIds) {
      let index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
    }
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    console.log(this.commentForm.value);
    this.dishservice.postComment(this.dish._id, this.commentForm.value)
      .then(() => {
        this.dishservice.getComments(this.dish._id)
          .subscribe(comments => this.dish.comments = comments);
      },
      err => console.log("Error ", err));
    this.commentForm.reset({
      rating: 5,
      comment: ''
    });
    this.commentFormDirective.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  addToFavorites() {
    console.log("Add to Favorites")
    if (!this.favorite)
      this.favoriteService.postFavorite(this.dish._id)
        .then(favorites => { console.log(favorites); this.favorite = true; })
        .catch(err => console.log("Error ", err));
  }
}