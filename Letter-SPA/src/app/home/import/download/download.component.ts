import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProgressStatus, ProgressStatusEnum } from 'src/app/models/progress-status.model';
import { FileService } from 'src/app/service/file.service';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @Output() public deletedFileName: EventEmitter<string> = new EventEmitter<string>();


  constructor(private service: FileService, private router: Router) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  delete(fileName) {
    this.service.deleteFile(fileName).subscribe(() => {
      this.deletedFileName.emit(fileName);
    },error => {
      console.log(error);
    });
  }

  public download() {
    this.downloadStatus.emit( {status: ProgressStatusEnum.START});
    this.service.downloadFile(this.fileName).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            this.downloadStatus.emit( {status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100)});
            break;
          case HttpEventType.Response:
            this.downloadStatus.emit( {status: ProgressStatusEnum.COMPLETE});
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = this.fileName;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
      },
      error => {
        this.downloadStatus.emit( {status: ProgressStatusEnum.ERROR});
      }
    );
  }

}
