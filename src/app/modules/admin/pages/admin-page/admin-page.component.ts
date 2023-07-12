import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { TrackModel } from '@core/models/tracks.model';
import { AdminService } from '@modules/admin/services/admin.service';
import { TrackService } from '@modules/tracks/services/track.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  form: FormGroup = new FormGroup({});
  tracks: TrackModel[] = [];
  trackId: string = ""
  
  enabledEdit: boolean = false;
  enabledAdd: boolean = true;
  actionTitle: string = '';
  buttonActionTitle: string[] = ['Agregar', 'Editar'];

  constructor(private trackService: TrackService, private adminService: AdminService) {

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
      ]),
      id: new FormControl('0', [
        Validators.required,
      ])
    });

    this.form.controls['id'].disable();

    //const {data}: any = (dataRaw as any).default;// para poder obtener los datos al importar archivos json
    this.trackService.getAllTracks$().subscribe(tracks => {
      console.log('papapapap', tracks)
      this.tracks = tracks.reverse();
    });
  }

  submitTrack(){
    const {name, album, cover, artist, id} = this.form.value;
    const track = {
      name,
      album,
      cover,
      artist,
      id
    };
    
    this.form.reset();
    if(this.enabledAdd){
      //console.log('NEW TRACK', track);
      //this.adminService.addTrack$(track);
      this.adminService.addTrack$(track).subscribe(res => {
        //console.log('Result: ', res);
        this.getAllTracks(); 
      })
    }      
    else{
      console.log('EDIT TRACK', track);
      console.log('EDIT TRACK ID', this.trackId);
      //lamar al servicio
      this.adminService.editTrack$(this.trackId, track).subscribe(res => {
        this.sendEdition();
        this.getAllTracks();
      });      
    }
  }

  getAllTracks(){
    this.trackService.getAllTracks$().subscribe(tracks => {
      //console.log(tracks)
      this.tracks = tracks.reverse();
    });
  }

  sendEdition(){
    console.log(this.form.value);
    this.enabledAdd = true;
    this.enabledEdit = false;
    this.actionTitle = this.buttonActionTitle[0];
    this.form.reset();
  }

  editTrack(track: any){
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
      artist: track.artist,
      id: track.uid //como este campo esta desabilitado, se le asigna el valor pero el mismo no cambio en el formulario. Por esto uso la variable trackId
    });
    //console.log("FORMULARIO PARA EDITAR", this.form.value)
    this.trackId = track.uid
  }
  deleteTrack(track: any){
    this.adminService.deleteTrack$(track.uid).subscribe(res => {
      console.log('Result: ', res);
      this.getAllTracks();
    });
  }
}
