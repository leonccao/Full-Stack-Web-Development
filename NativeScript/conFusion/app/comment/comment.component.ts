import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Comment } from '../shared/comment';
import { TextField } from 'ui/text-field';
import { Slider } from 'ui/slider';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
    selector: 'app-comment',
    moduleId: module.id,
    templateUrl: './comment.component.html'
}) 
export class CommentComponent implements OnInit {

    newComment: Comment;
    commentForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private params: ModalDialogParams) {
            this.commentForm = this.formBuilder.group({
                author: ['', Validators.required],
                rating: 5,
                comment: ['', Validators.required]
            });
    }

    ngOnInit() {}

    public onAuthorChange(args) {
        let textField = <TextField>args.object;
        this.commentForm.patchValue({ author: textField.text });
    }

    public onRatingChange(args) {
        let slider = <Slider>args.object;
        this.commentForm.patchValue({ rating: slider.value });
    }

    public onCommentChange(args) {
        let textField = <TextField>args.object;
        this.commentForm.patchValue({ comment: textField.text });
    }

    onSubmit() {
        this.newComment = this.commentForm.value;
        const date = new Date();
        this.newComment.date = date.toISOString();
        console.log(this.newComment);
        this.params.closeCallback(this.newComment);
    }
}