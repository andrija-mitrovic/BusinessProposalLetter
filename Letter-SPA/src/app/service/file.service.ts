import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpEvent, HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Customer } from '../models/customer.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  apiDownloadUrl = environment.apiUrl + 'download';
  apiUploadUrl = environment.apiUrl + 'upload';
  apiFileUrl = environment.apiUrl + 'files';
  apiReadExcelUrl = environment.apiUrl + 'customers';
  apiDeleteExcelUrl = environment.apiUrl + 'delete';
  apiFilesName = environment.apiUrl + 'files/name';
  apiFolderSize=environment.apiUrl+'folder/size';

  constructor(private httpClient: HttpClient) {}

  public deleteFile(fileName?) {

    return this.httpClient.request(new HttpRequest(
      'DELETE',
      `${this.apiDeleteExcelUrl}?file=${fileName}`,
      {
        reportProgress: true
      }));
  }

  public downloadFile(file: string): Observable<HttpEvent<Blob>> {
    return this.httpClient.request(new HttpRequest(
      'GET',
      `${this.apiDownloadUrl}?file=${file}`,
      null,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }

  public uploadFile(file: Blob): Observable<HttpEvent<void>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.request(new HttpRequest(
      'POST',
      this.apiUploadUrl,
      formData,
      {
        reportProgress: true
      }));
  }

  public getFiles(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.apiFileUrl);
  }

  readExcel(fileName?): Observable<Customer[]> {
    let params = new HttpParams();
    if(fileName != null) {
      params = params.append('fileName', fileName);
    }
    return this.httpClient.get<Customer[]>(this.apiReadExcelUrl, {observe: 'response', params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getFilesName(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.apiFilesName);
  }

}
