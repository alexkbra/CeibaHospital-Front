import { Component, OnInit } from '@angular/core';
import { BlobStorageService } from '@core/services/blob/blobstorage.service';
import { from, Observable } from 'rxjs';
import { combineAll, map } from 'rxjs/operators';
import { ISasToken } from '@core/services/blob/azure.storage';
import { MensajeService } from '@core/services/mensajes/mensaje.service';
import Swal from 'sweetalert2';

interface IUploadProgress {
  filename: string;
  progress: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mensaje: string;

  uploadProgress$: Observable<IUploadProgress[]>;
  filesSelected = false;

  constructor(private blobStorage: BlobStorageService,private serviceMensaje: MensajeService) { }

  ngOnInit() {
    this.mensaje = "hola!";
  }

  onFileChange(event: any): void {
    this.filesSelected = true;

    this.uploadProgress$ = from(event.target.files as FileList).pipe(
      map(file => this.uploadFile(file)),
      combineAll()
    );
  }

  uploadFile(file: File): Observable<IUploadProgress> {
    const accessToken: ISasToken = {
      container: 'files',
      filename: file.name,
      storageAccessToken:
        '?sv=2020-02-10&ss=b&srt=sco&sp=rwdlacx&se=2021-03-28T00:31:39Z&st=2021-03-03T16:31:39Z&spr=https&sig=Y8NyrfuXE7NpffgVt5b1o4zRHXMVB%2BNp3J%2FNcqkJwC4%3D',
      storageUri: 'https://hospitalceibastorage.blob.core.windows.net'
    };

    return this.blobStorage
      .uploadToBlobStorage(accessToken, file)
      .pipe(map(progress => this.mapProgress(file, progress)));
  }

  private mapProgress(file: File, progress: number): IUploadProgress {
    return {
      filename: file.name,
      progress: progress
    };
  }


  enviarMensaje(){
    this.serviceMensaje.enviar(this.mensaje).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado'
      });
    },(error)=>{
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: error.error.mensaje
      });
    });
  }

}
