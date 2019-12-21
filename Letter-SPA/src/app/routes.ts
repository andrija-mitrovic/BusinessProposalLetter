import { Routes } from '@angular/router';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ImportComponent } from './home/import/import.component';
import { ScheduleComponent } from './home/schedule/schedule.component';
import { ReportComponent } from './home/report/report.component';
import { CustomersComponent } from './home/customers/customers.component';


export const appRoutes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent  },
    {path: 'import', component: ImportComponent  },
    {path: 'schedule', component: ScheduleComponent},
    {path: 'report', component: ReportComponent},
    {path: 'customers', component: CustomersComponent}
];
