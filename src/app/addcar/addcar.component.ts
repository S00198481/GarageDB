import { noUndefined } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from '../car';
import { FirebaseApiService } from '../services/firebase-api.service';
import { Task } from '../task';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.css']
})
export class AddcarComponent implements OnInit {

  message!: string;
  carForm!: FormGroup;
  @Input() car?: Car;
  tasks: Task[] = [];
  cars!:Car[];
  tasksURI!: string; 

  constructor(private carService: FirebaseApiService) { }

  ngOnInit() {
    this.carForm = new FormGroup({
      make: new FormControl(this.car?.make, [Validators.required, Validators.minLength(2)]),
      model: new FormControl(this.car?.model),
      reg: new FormControl(this.car?.reg),
      year: new FormControl(this.car?.year)
    })
  }

  onSubmit() {
    //assign form values to car object
    this.car = this.carForm.value;

    //get task div
    let taskFields = document.getElementById("tasks");
    //initialise tasks array
    let newTasks = new Array<string>();
    //get count of task fields created
    let count = taskFields?.childElementCount;
    //iterate through task fields
    for (let i = 0; i < count!; i++) {
      //create empty task
      //find input field according to index
      let input = document.getElementById((i+1).toString()) as HTMLInputElement;
      //assign details to task object
      //push to tasks array
      newTasks.push(input.value);
      console.log(input)
      }
      console.log(newTasks)
      for(let j=0; j<newTasks.length; j++) {
        if(this.tasksURI!= undefined) {
        this.tasksURI = (this.tasksURI + "&tasks[" + j + "]=" + newTasks[j]);
        console.log(this.tasksURI)
        }
        else {
          this.tasksURI = ("&tasks[" + j + "]=" + newTasks[j]);
          console.log(this.tasksURI)
        }
    }
    //assign tasks to car

    //pass car to car service for upload
    this.car!.tasks = this.tasksURI
    this.carService.addCar(this.car!)
    .subscribe({
      next: car => {
        console.log(JSON.stringify(car) + ' has been uploaded');
        this.message = `${car.make} ${car.model} has been added to GarageDB`;
      },
      error: (err) => this.message = err
    });
  }

  dismissAlert() {
    this.message = "";
  }

  addField() {
    //this method creates a new field for a task object
    
    //find task field div
    let taskFields = document.getElementById("tasks");
    //count number of existing task fields
    let count = taskFields?.childElementCount;
    //create new list element
    let newElement = document.createElement('li');
    //create new input element
    let input = document.createElement('input');
    //set id to the id of previous field + 1
    //this will allow us to iterate through them using for loop
    input.id = (count!+1).toString();
    //set type
    input.type = "text";
    //add styling
    input.classList.add("col-10");
    input.classList.add("mb-2");
    input.classList.add("form-control")
    //append to parents
    newElement.appendChild(input);
    taskFields?.appendChild(newElement);
  }
}
