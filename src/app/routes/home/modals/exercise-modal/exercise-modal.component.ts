import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ExerciseRequest, PlannedExercise, TrainingPlanModel } from '../../models/training-plan';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exercise-modal',
  templateUrl: './exercise-modal.component.html',
  styleUrls: ['./exercise-modal.component.scss']
})
export class ExerciseModalComponent implements OnInit {
  @Output() onSaveClicked: EventEmitter<any> = new EventEmitter();
  trainigPlan: TrainingPlanModel;

  constructor(
    public bsModalRef: BsModalRef,
    public options: ModalOptions,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.trainigPlan = (<any>this.options.initialState)?.trainigPlan ?? {};
  }

  onAddExercise($event: ExerciseRequest) {
    if(this.trainigPlan?.plannedExercises?.some(c => c.exercise?.id == $event.id)) {
      this.toastrService.error("Exercíco já foi adicionado!")
      return;
    }
  
    let plannedExercise: PlannedExercise = {
      exerciseId: $event.id,
      trainingPlanId: this.trainigPlan.id,
      sets: $event.sets,
      repetitions: $event.repetitions,
      weight: $event.weight,
      exercise: $event,
    }
    
    debugger
    this.onSaveClicked.emit({trainigPlanId: this.trainigPlan.id, plannedExercise});
  }
}
