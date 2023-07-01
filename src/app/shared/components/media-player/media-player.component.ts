import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent {
  mockCover: TrackModel = {
    cover: '',
    album: 'Gioli & Assia',
    name: 'Bebe(Oficial)',
    url: '',
    _id: '1'
  }

  constructor(){}
}
