import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MediaPlayerComponent } from './components/media-player/media-player.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    SidebarComponent,
    MediaPlayerComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
