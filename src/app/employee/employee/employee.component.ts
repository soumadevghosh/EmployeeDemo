import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgmMap, MouseEvent, MapsAPILoader } from '@agm/core';
import { Employee } from '../employee-list/employee-list.component';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})


export class EmployeeComponent implements OnInit {

  imageSrc: string;
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  employeeForm = new FormGroup({})
  lat: number;
  lng: number;
  getAddress: number;
  zoom: number;
  latitude: any;
  longitude: any;
  Employee: Employee
  constructor(private apiloader: MapsAPILoader,private service:EmployeeService,private router:Router) { }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.pattern(/^[1-9]\d{9}$/)),
      location: new FormControl(),
      address: new FormControl(),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });
    this.get()
    this.agmMap.triggerResize(true);
    this.zoom = 16;
  }
  get() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.getAddress = (this.lat, this.lng)
          console.log(position)
          this.apiloader.load().then(() => {
            let geocoder = new google.maps.Geocoder;
            let latlng = {
              lat: this.lat,
              lng: this.lng
            };
            geocoder.geocode({
              'location': latlng
            }, function (results) {
              if (results[0]) {
                this.currentLocation = results[0].formatted_address;
                console.log(this.assgin);
              } else {
                console.log('Not found');
              }
            });
          });
        }
      })
    }
  }
  mapClicked($event: MouseEvent) {
    this.latitude = $event.coords.lat,
      this.longitude = $event.coords.lng
    this.apiloader.load().then(() => {
      let geocoder = new google.maps.Geocoder;
      let latlng = {
        lat: this.latitude,
        lng: this.longitude
      };
      geocoder.geocode({
        'location': latlng
      }, function (results) {
        if (results[0]) {
          this.currentLocation = results[0].formatted_address;
          console.log(this.currentLocation);
        } else {
          console.log('Not found');
        }
      });
    });
  }
  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.employeeForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }
  onSubmit(){
    this.Employee = new Employee(
      null,
      this.employeeForm.controls.name.value,
      this.employeeForm.controls.email.value,
      this.imageSrc,
      this.employeeForm.controls.phone.value,
      this.latitude+" "+this.longitude,
      this.employeeForm.controls.address.value
    )
    this.service.addEmployee(this.Employee).subscribe(response=>{
      this.router.navigate(['employee']);
    }); 
  }
}
