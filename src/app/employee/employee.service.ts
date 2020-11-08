import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee-list/employee-list.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<Employee[]>(
      `https://5fa6c2e1085bf700163de797.mockapi.io/mock_api/test/Employees`
    );
  }
  addEmployee(todo) {
    return this.http.post(
      `https://5fa6c2e1085bf700163de797.mockapi.io/mock_api/test/Employees`,
      Employee
    );
  }
  getEmployee(id) {
    return this.http.get<Employee>(
      `https://5fa6c2e1085bf700163de797.mockapi.io/mock_api/test/Employees/${id}`
    );
  }
}
