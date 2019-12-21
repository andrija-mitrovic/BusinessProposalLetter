import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { FileService } from 'src/app/service/file.service';
import { AlertifyService } from 'src/app/service/alertify.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  fileName: string = '';
  files: string[];
  filesName: string[] = [];

  constructor(private service: FileService,private alertify: AlertifyService) { }

  ngOnInit() {
    this.getFiles();
  }

  private getFiles() {
    this.service.getFiles().subscribe(data => {
      this.files = data;
      for (let i = 0; i < this.files.length; i++) {
        let fileExtensionLength =
          this.files[i].length - this.files[i].lastIndexOf(".");
        let fileNamePom = this.files[i]
          .toString()
          .substring(
            this.files[i].toString().lastIndexOf("\\") + 1,
            this.files[i].lastIndexOf(".")
          );
        this.filesName.push(fileNamePom);
      }
    });
  }

  onEmployeeSelected(val: string) {
    this.fileName = val;
    this.service.readExcel(this.fileName).subscribe((customers: Customer[]) => {
      this.customers = customers;
    }, error => {
      this.customers = [];
      this.alertify.error('Excel document must be in correct format');
    });
  }
}
