import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/core/auth/user/user.service';
import { HomeService } from '../home.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { TrainingPlanModalComponent } from '../modals/training-plan-modal/training-plan-modal.component';
import { ToastrService } from 'ngx-toastr';
import { ExerciseModalComponent } from '../modals/exercise-modal/exercise-modal.component';
import { PlannedExercise, TrainingPlanModel } from '../models/training-plan';

const swal = require('sweetalert');
const TRAINING_PLAN = 'TRAINING_PLAN'
const PLAN_EXERCISE = 'PLAN_EXERCISE'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  TrainingPlans: Array<any>;
  user$ = this.userService.getUser();
  dateFormat = "YYYY-MM-DD HH:mm:ss";
  bsModalRef: BsModalRef;
  modalConfig: ModalOptions = {
    keyboard: true,
    ignoreBackdropClick: false,
    class: "custom-modal-refactory"
  };

  constructor(
    private userService: UserService,
    private homeService: HomeService,
    private modalService: BsModalService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.getTraningPlans();
  }

  ngOnDestroy(): void {

  }

  onDeleteTraningPlan(id: number) {
    this.onDelete(id, 'Quer mesmo excluir essa ficha de treino?', TRAINING_PLAN)
  }

  onDeletePlanExercise($event: any, trainingPlanId: number) {
    this.onDelete(trainingPlanId, 'Quer mesmo excluir esse treino?', PLAN_EXERCISE, $event.planExerciseId)
  }

  deleteTraningPlan(id: number) {
    this.homeService.deleteTrainingPlan(id)
      .pipe(take(1))
      .subscribe(
        success => {
          swal('Excluído!', 'A ficha foi excluído', 'success');
          var index = this.TrainingPlans.findIndex(c => c.id == id);
          this.TrainingPlans.splice(index, 1);
        },
        error => {
          console.log(error)
          swal('Erro', error?.responseMessage, 'error')
        }
      )
  }

  deletePlanExercise(trainingPlanId: number, planExerciseId) {
    this.homeService.deletePlanExercise(trainingPlanId, planExerciseId)
      .pipe(take(1))
      .subscribe(
        success => {
          swal('Excluído!', 'O exercício foi excluído', 'success');
          var index1 = this.TrainingPlans.findIndex(c => c.id == trainingPlanId);
          var index2 = this.TrainingPlans[index1].plannedExercises.findIndex(c => c.id == planExerciseId);
          this.TrainingPlans[index1].plannedExercises.splice(index2, 1);
        },
        error => {
          console.log(error)
          swal('Erro', "Erro", 'error')
        }
      )
  }

  openCreateTrainingModal() {
    this.modalConfig.initialState = {};
    this.bsModalRef = this.modalService.show(TrainingPlanModalComponent, this.modalConfig);
    this.bsModalRef.content.onSaveClicked.subscribe(result => {
      if (result) {
        window.setTimeout(() => {
          this.toastrService.success("Cadastro efetuado com sucesso!");
          this.bsModalRef.hide();
        }, 500)
        this.getTraningPlans();
      }
    });
  }

  openAddExerciseModal(trainigPlan: TrainingPlanModel) {
    this.modalConfig.initialState = { trainigPlan };
    this.bsModalRef = this.modalService.show(ExerciseModalComponent, this.modalConfig);
    this.bsModalRef.content.onSaveClicked.subscribe(result => {
      if (result) {
        this.addExercise(result.trainigPlanId, result.plannedExercise);
        window.setTimeout(() => {
          this.bsModalRef.hide();
          this.toastrService.success("Exercício adicionado com sucesso!");
        }, 500)
        this.getTraningPlans();
      }
    });
  }
  
  private getTraningPlans() {
    this.homeService.getAllTrainingPlan()
      .pipe(take(1))
      .subscribe(
        success => {
          this.TrainingPlans = success.result;
        },
        error => {
          console.log(error)
        }
      )
  }

  private onDelete(id: number, text: string, type: string, planExercise = null ) {
    swal({
      title: 'Atenção',
      text: text,
      icon: 'warning',
      closeOnEsc: true,
      buttons: {
        cancel: {
          text: 'Não!',
          value: null,
          visible: true,
          className: "",
          closeModal: false
        },
        confirm: {
          text: 'Sim, quero excluir!',
          value: true,
          visible: true,
          className: "bg-danger",
          closeModal: false
        }
      }
    }).then((isConfirm) => {
      if (isConfirm) {
        switch (type) {
          case TRAINING_PLAN:
            this.deleteTraningPlan(id);
            break;
          case PLAN_EXERCISE:
            this.deletePlanExercise(id, planExercise);
            break;
        }
      } else {
        swal('Cancelado', '', 'error');
      }
    });
  }

  private addExercise(trainigPlanId: number, plannedExercise: PlannedExercise) {
    this.homeService.addExercise(trainigPlanId, plannedExercise)
      .pipe(take(1))
      .subscribe(
        success => {
          plannedExercise.id = success.result
          this.TrainingPlans.find(x => x.id == trainigPlanId).plannedExercises.push(plannedExercise);
        },
        error => {
          console.log(error)
          swal('Erro', error?.responseMessage, 'error')
        }
      )
  }
}
