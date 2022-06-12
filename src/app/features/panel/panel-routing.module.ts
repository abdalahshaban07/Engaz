import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'comments',
  },
  {
    path: 'comments',
    loadChildren: () =>
      import('@features/panel/comments/comments.module').then(
        (m) => m.CommentsModule
      ),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('@features/panel/posts/posts.module').then((m) => m.PostsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
