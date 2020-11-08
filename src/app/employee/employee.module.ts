import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeService } from './employee.service';
import { EmployeeRoutingModule } from './employee-routing.module';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [EmployeeComponent, EmployeeListComponent],
  imports: [
    CommonModule,EmployeeRoutingModule,
    AgmCoreModule.forRoot({  
      apiKey: 'AIzaSyDWKCnWSFkct3D4e-DrzJqSD7Khnmf-0XM'  
    }),
  ],
  providers:[EmployeeService]
})
export class EmployeeModule { }
