import { Component } from '@angular/core';
import * as dataRaw from '../../../../data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent {
  mockTrackList: Array<TrackModel> = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const {data}: any = (dataRaw as any).default;// para poder obtener los datos al importar archivos json
    this.mockTrackList = data;
  }
}
