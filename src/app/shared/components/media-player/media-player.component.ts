import { Component, ElementRef, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent {
  //track!: TrackModel;
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  listObservers$: Subscription[] = [];
  state: string = 'paused';

  constructor(public multimediaService: MultimediaService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    // const observer1$: Subscription = this.multimediaService.callback.subscribe((response: TrackModel) => {
    //   console.log('desde multimedia service', response)
    // });
    // this.listObservers$.push(observer1$);

    // const observable1$ = this.multimediaService.myObservable1$.subscribe((resOk) => {
    //     //next()
    //     console.log("EL AGUA LLEGA PERFECTO: ", resOk);
    // },(resFail) => {
    //   //error()
    //   console.log("SE TAPO LA TUBERIA:", resFail);
    // })

    // const observer1$ = this.multimediaService.trackInfo$.subscribe(track=>{
    //   console.log('debo reproducir la cancion: ', track);
    //   this.track = track;
    // })
    // this.listObservers$.push(observer1$);

    const observer1$ = this.multimediaService.playerStatus$.subscribe(status=> this.state = status);
    this.listObservers$.push(observer1$);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('OnDestroy');
    this.listObservers$.forEach(o => o.unsubscribe);
  }

  handlePosition(event: MouseEvent): void{
    const elNative: HTMLElement = this.progressBar.nativeElement;
    const {clientX} = event;
    const {x, width} = elNative.getBoundingClientRect();
    console.log('MOUSE EVENT', event);
    console.log('CLIENT X', clientX);
    console.log(`click(x): ${clientX}, Width: ${width}, With Initial: ${x}`);
    const clickX = clientX - x;
    const percentageFromX = (clickX * 100) / width;
    this.multimediaService.seekAudio(percentageFromX);
  }
}
