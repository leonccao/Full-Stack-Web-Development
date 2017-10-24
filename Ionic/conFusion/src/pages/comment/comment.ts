import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../../shared/comment';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  addcomment: FormGroup;
  usercomment: Comment;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder) {
      this.addcomment = this.formBuilder.group({
        author: ['', Validators.required],
        rating: ['5', Validators.required],
        comment: ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  onSubmit() {
    this.usercomment = this.addcomment.value;
    const date = new Date();
    this.usercomment.date = date.toISOString();
    console.log(this.usercomment);
    this.viewCtrl.dismiss(this.usercomment);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
