import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

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

  listObservers$: Subscription[] = [];

  constructor(private multimediaService: MultimediaService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const observer1$: Subscription = this.multimediaService.callback.subscribe((response: TrackModel) => {
      console.log('desde multimedia service', response)
    });

    this.listObservers$.push(observer1$);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('OnDestroy');
    this.listObservers$.forEach(o => o.unsubscribe);
  }
}
