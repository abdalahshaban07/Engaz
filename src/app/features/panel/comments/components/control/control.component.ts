import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { IComment } from '../../models/comments';
import { CommentsService } from '../../services/comments.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent implements OnInit {
  form!: FormGroup;
  id!: string | number;

  constructor(
    private readonly commentServ: CommentsService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /* We're getting the id from the url and assigning it to the id variable. */
    this.id = this.route.snapshot.paramMap.get('id') as string | number;
    this.createForm();
  }

 /**
  * We're creating a form group with three form controls, each with their own validation rules
  */
  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  /**
   * If has an id, then it's an update, otherwise it's a create
   */
  controlComments() {
    if (this.id) {
      this.getAndUpdateComment();
    } else {
      this.createComment();
    }
  }

  /**
   * We're calling the create function from the comment service, passing in the form value, and
   * subscribing to the response
   */
  createComment() {
    this.commentServ.create(this.form.value).subscribe((res) => {
      console.log(res);
    });
  }

  /**
   * We're calling the get() method of the comment service, which returns an observable. We're
   * subscribing to that observable, and when the observable returns a value, we're using the
   * patchValue() method of the form to update the form with the values returned from the service
   */
  getAndUpdateComment() {
    this.commentServ.get(this.id).subscribe((res) => {
      console.log(res);
      let comment: IComment = {
        postId: 1,
        id: 1,
        name: 'id labore ex et quam laborum',
        email: 'Eliseo@gardner.biz',
        body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
      };

      this.form.patchValue(comment);
      this.updateComment();
    });
  }

 /**
  * We're calling the update function from the comment service, passing in the id of the comment we
  * want to update, and the form value
  */
  updateComment() {
    this.commentServ.update(this.id, this.form.value).subscribe((res) => {
      console.log(res);
    });
  }
}
