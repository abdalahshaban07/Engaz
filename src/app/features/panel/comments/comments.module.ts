import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { ListComponent } from './components/list/list.component';
import { ControlComponent } from './components/control/control.component';


@NgModule({
  declarations: [
    ListComponent,
    ControlComponent
  ],
  imports: [
    CommonModule,
    CommentsRoutingModule
  ]
})
export class CommentsModule { }
