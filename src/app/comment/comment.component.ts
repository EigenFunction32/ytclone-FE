import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../user.service";
import {CommentsService} from "../comments.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentDto} from "../comment-dto";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  videoId: string = '';
  commentsForm: FormGroup;
  commentsDto: CommentDto[] = [];

  constructor(private userService: UserService, private commentService: CommentsService, private matSnackBar: MatSnackBar) {
    this.commentsForm = new FormGroup({
      comment: new FormControl('comment'),
    });

  }

  ngOnInit(): void {
    this.getComments();
  }

  postComment() {
    const comment = this.commentsForm.get('comment')?.value;
    this.userService.getUserInfo().subscribe(userId => {
      const commentDto = {
        "commentText": comment,
        "authorId": userId,
      }
      this.commentService.postComment(commentDto, this.videoId).subscribe(() => {
        this.matSnackBar.open("Commento postato con successo", "OK");
        this.commentsForm.get('comment')?.reset();
        this.getComments();
      })
    })
  }

  getComments() {
    this.commentService.getAllComments(this.videoId).subscribe(data => {
      this.commentsDto = data;
    })
  }
}
