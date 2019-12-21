import { Component, OnInit } from '@angular/core';
import { FileService } from '../service/file.service';
import { AlertifyService } from '../service/alertify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  filesName: string[];

  constructor(private fileService: FileService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.fileService.getFilesName().subscribe((filesName: string[]) => {
      this.filesName = filesName;
    }, error => {
      this.alertify.error(error);
    });
  }


}
