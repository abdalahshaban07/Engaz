import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private readonly commentServ: CommentsService) {}

  ngOnInit(): void {
    this.getComments();
  }

  /**
   * The function getComments() is a function that is called when the component is initialized. It
   * calls the getList() function in the comment service, which returns an observable. The observable
   * is then subscribed to
   */
  getComments() {
    this.commentServ.getList().subscribe((res) => {
      console.log(res);
    });
  }

  /**
   * The deleteComment function takes an id as a parameter, and then calls the delete function from the
   * comment service, which takes an id as a parameter
   * @param {number} id - The id of the comment to be deleted.
   */
  deleteComment(id: number) {
    this.commentServ.delete(id).subscribe((res) => {
      console.log(res);
    });
  }
}
