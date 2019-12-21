import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './home/report/report.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ScheduleComponent } from './home/schedule/schedule.component';
import { ImportComponent } from './home/import/import.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { FileService } from './service/file.service';
import { UploadComponent } from './home/import/upload/upload.component';
import { DownloadComponent } from './home/import/download/download.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomersComponent } from './home/customers/customers.component';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { FormsModule } from '@angular/forms';
import { AlertifyService } from './service/alertify.service';
import { ErrorInterceptorProvider } from './service/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportComponent,
    DashboardComponent,
    ScheduleComponent,
    ImportComponent,
    UploadComponent,
    DownloadComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ScheduleModule, RecurrenceEditorModule
  ],
  providers: [
    FileService,
    ErrorInterceptorProvider,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService,
    FileService,
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
