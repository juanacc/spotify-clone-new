import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
//import * as dataRaw from '../../../../data/tracks.json';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  form: FormGroup = new FormGroup({});
  tracks: TrackModel[] = [];
  
  enabledEdit: boolean = false;
  enabledAdd: boolean = true;
  actionTitle: string = '';
  buttonActionTitle: string[] = ['Agregar canción', 'Editar canción'];

  constructor(private trackService: TrackService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.actionTitle = this.buttonActionTitle[0];
    
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      album: new FormControl('', [
        Validators.required,
      ]),
      cover: new FormControl('', [
        Validators.required,
      ]),
      artist: new FormControl('', [
        Validators.required,
      ])
    });

    //const {data}: any = (dataRaw as any).default;// para poder obtener los datos al importar archivos json
    this.trackService.getAllTracks$().subscribe(tracks => {
      this.tracks = tracks;
    });
  }

  addSong(){

  }

  sendEdition(){
    console.log(this.form.value);
    this.enabledAdd = true;
    this.enabledEdit = false;
    this.actionTitle = this.buttonActionTitle[0];
    this.form.reset();
  }

  editSong(track: any){
    console.log('Editar', track)
    this.actionTitle = this.buttonActionTitle[1];
    this.enabledEdit = true;
    this.enabledAdd = false;
    
    //https://stackoverflow.com/questions/55275025/how-to-set-value-to-form-control-in-reactive-forms-in-angular
    //this.form.controls.name.setValue('abc');
    this.form.patchValue({
      name: track.name,
      album: track.album,
      cover: track.cover,
      artist: track.artist.name
   });
    
  }
  deleteSong(track: any){
    console.log('Borrar', track)
    //const {data}: any = (dataRaw as any).default;// para poder obtener los datos al importar archivos json
    //this.tracks = data;
    this.trackService.getAllTracks$().subscribe(tracks => {
      this.tracks = tracks;
    })
  }
}
