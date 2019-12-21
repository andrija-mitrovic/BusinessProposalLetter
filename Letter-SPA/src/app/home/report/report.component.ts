import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FileService } from "src/app/service/file.service";
import * as jsPDF from "jspdf";
import { NgForm } from "@angular/forms";
import { Customer } from "src/app/models/customer.model";
import { AlertifyService } from 'src/app/service/alertify.service';

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"]
})
export class ReportComponent implements OnInit {
  @ViewChild("reportForm", { static: true }) content: NgForm;
  filesName: string[] = [];
  files: string[];
  reportContent: any = {
    fileName: "",
    content: `<p>Dear Mr./Ms. {General menager},</p>

      <p>On behalf of our company, SOFTIT, I would like to emphasize how happy we are that you intend to avail of our services and that you have chosen our company to present and propose to you our services IT services.</p>
      
      <p>The company is primarily engaged in providing high-quality and efficient IT services. Our company is considered one of the biggest in the industry. After due consideration of your company's current needs and plans, we have come up with a comprehensive proposal and plan which will best serve your interests. The terms of this proposal are perfectly tailored to fit your business context and needs. Rest assured that we will charge you with flexible and reasonable rates.</p>
      
      <p>In line with the foregoing relevant points, this proposal shall showcase how the company functions as a business, the various services that it offers to its clients, the proposed execution and implementation plan, the schedule of fees, the payment terms and conditions, and etc.</p>
      
      <p>If you have inquiries or concerns about the terms that we are offering, you can contact me with this number 1234567 or email me at itservice@gmail.com. We also want to hear more about your suggestions and recommendations. We're hoping for your positive response.</p>
      
      <p>Best regards,<p>
       
      <p>Andrija Mitrovic <br>
         Software developer</p>`
  };
  customers: Customer[] = [];

  constructor(private service: FileService, private alertify: AlertifyService) {}

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
  //(ngModelChange)="onEmployeeSelected($event)" in html
  /* onEmployeeSelected(val: string) {
    this.reportContent.fileName = val;
  }*/

  createReport() {
    const contentWidth = 180;
    this.service.readExcel(this.reportContent.fileName).subscribe(
      (customersReturn: Customer[]) => {
        this.customers = customersReturn;
        let doc = new jsPDF("p", "mm", "a4");

        for (let i = 0; i < this.customers.length; i++) {
          doc.fromHTML(this.customers[i].companyName, 15, 30, {
            width: contentWidth
          });
          doc.fromHTML(this.customers[i].address, 15, 35, {
            width: contentWidth
          });
          doc.fromHTML(this.customers[i].email, 15, 40, {
            width: contentWidth
          });

          let content = this.reportContent.content.replace(
            "{General menager}",
            this.customers[i].menagerName
          );
          doc.fromHTML(content, 15, 80, {
            width: contentWidth
          });

          if (i < this.customers.length - 1) 
            doc.addPage(i.toString());
        }

        doc.save("letters.pdf");
      },
      error => {
        this.alertify.error('Excel document must be in a correct format to create a report');
      }
    );
  }
}
