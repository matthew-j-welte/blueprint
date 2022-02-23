import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlobObjectDto } from '../models/common.model';

@Injectable({
  providedIn: 'root',
})
export class BlobService {
  constructor(private http: HttpClient) {}

  // Use this if you want to customize how yuo handle progress events etc.
  public uploadBlob(file: File, blob: BlobObjectDto): Observable<HttpEvent<string>> {
    const httpParams = new HttpParams()
      .set('container', blob.container)
      .set('fileName', blob.fileName);
    const formData = new FormData();
    formData.append('file', file, blob.fileName);
    return this.http.post<string>('http://localhost:5001/Blob', formData, {
      params: httpParams,
      reportProgress: true,
      observe: 'events',
    });
  }

  // Use this for simple upload where you just await the blob url
  public easyUploadBlob(
    file: File,
    container: string,
    title: string = 'untitled'
  ): Observable<string> {
    const blobObject = this.fileRefToBlob(file, container, title);
    return this.uploadBlob(file, blobObject).pipe(
      map(() => `${blobObject.container}::${blobObject.fileName}`)
    );
  }

  public fileRefToBlob(file: File, container: string, title: string = 'untitled'): BlobObjectDto {
    const fileParts = file?.name?.split('.');
    let fileName = title;
    if (fileParts) {
      const fileExt = `.${fileParts[fileParts.length - 1]}`;
      fileName += fileExt;
    }
    return {
      container,
      fileName,
    } as BlobObjectDto;
  }
}
