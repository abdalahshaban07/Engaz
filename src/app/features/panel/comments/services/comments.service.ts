import { Injectable } from '@angular/core';
import { ResourceService } from '@core/services/resource.service';
import { IComment } from '../models/comments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentsService extends ResourceService<IComment> {

 
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * It returns a string that represents the URL of the resource
   * @returns The resource url for the comments resource.
   */
  getResourceUrl(): string {
    return '/comments';
  }
}
