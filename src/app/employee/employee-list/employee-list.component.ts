import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
export class Employee {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public image: string,
    public phone: string,
    public location: string,
    public address: string
  ) {}
}
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService, private router: Router) {}
  emp: Employee[];
  ngOnInit() {
    this.refreshGrid();
  }
  refreshGrid() {
    this.service.getEmployees().subscribe(response => {
      this.emp = response;
    });
  }
  addEmployee() {
    this.router.navigate(["employee/add"]);
  }

}
