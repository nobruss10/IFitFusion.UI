import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ExerciseRequest, PlannedExercise, TrainingPlanModel } from '../../models/training-plan';
import { HomeService } from '../../home.service';
import { take } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-training-plan-modal',
  templateUrl: './training-plan-modal.component.html',
  styleUrls: ['./training-plan-modal.component.scss']
})
export class TrainingPlanModalComponent implements OnInit {
  traningPlan: TrainingPlanModel;
  exercises: ExerciseRequest[] = [];
  plannedExercises : PlannedExercise[];  
  @Output() onSaveClicked: EventEmitter<any> = new EventEmitter();
    
  constructor(  
    public bsModalRef: BsModalRef,
    private homeService: HomeService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  onAddExercise($event: ExerciseRequest) {
    if(this.exercises.some(c => c.id == $event.id)) {
      this.toastrService.error("Exercíco já foi adicionado!")
      return;
    }
    
    this.exercises.push($event);
  }
  
  removeExercise(index: number) {
    this.exercises.splice(index, 1);
  }
  
  submitForm(): void {
    let request = this.createRequest();
    this.homeService.addTrainingPlan(request)
      .pipe(take(1))
      .subscribe(
        success => {
          this.onSaveClicked.emit({});
        },
        error => {
          console.log(error)
        }
      )
  }

  private createRequest() : any {
    var date = new Date();
    return {
      startDate: date,
      endDate: date,
      plannedExercises: this.exercises.map(c => {
        return { 
            exerciseId: c.id, 
            sets: c.sets,
            description: c.description, 
            repetitions: c.repetitions,
            weight: c.weight
        }
      })
    }
  }
}
