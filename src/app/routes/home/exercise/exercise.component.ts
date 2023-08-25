import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise, ExerciseRequest } from '../models/training-plan';
import { HomeService } from '../home.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  exercise: Exercise;  
  sets = 0;
  repetitions = 0;
  weight = 0;

  exercises : Exercise[];
  @Output() OnAdd = new EventEmitter();

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getExercises()
  }


  private getExercises() {
    this.homeService.getExercices()
      .pipe(take(1))
      .subscribe(
        success => {
          this.exercises = success.result as Exercise[];
          this.exercise = success.result[0];
        },
        error => {
          console.log(error)
        }
      )
  }

  add() {
    this.OnAdd.emit({id: this.exercise.id,  name: this.exercise.name, weight: this.weight, repetitions: this.repetitions, sets: this.sets, imgUrl: this.exercise.imgUrl } as ExerciseRequest)
  }
}
