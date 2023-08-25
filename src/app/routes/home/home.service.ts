import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/core/config/config.service';
import { HttpServiceBase } from 'src/app/core/http-service/http-service-base';
import { ResponseModel } from 'src/app/core/http-service/model/response-model';
import { PlannedExercise, TrainingPlanModel } from './models/training-plan';

@Injectable()
export class HomeService extends HttpServiceBase {

  constructor(  
    http: HttpClient, 
    configService: ConfigService) { 
    super(http, configService.getConfiguration().apiURl)
  }
  
  getAllTrainingPlan(): Observable<ResponseModel> {
    return this.get('api/v1/TrainingPlan');
  }
  
  getExercices(): Observable<ResponseModel> {
    return this.get('api/v1/TrainingPlan/exercises');
  }

  addTrainingPlan(trainingPlan: TrainingPlanModel): Observable<ResponseModel> {
    return this.post(`api/v1/TrainingPlan`,trainingPlan );
  }

  addExercise(trainingId: number, plannedExercise: PlannedExercise): Observable<ResponseModel> {
    return this.post(`api/v1/TrainingPlan/${trainingId}/planned-exercise`, plannedExercise);
  }

  deleteTrainingPlan(trainingId: number): Observable<ResponseModel> {
    return this.delete(`api/v1/TrainingPlan/${trainingId}`);
  }

  deletePlanExercise(trainingId: number, planExerciseId: number): Observable<ResponseModel> {
    return this.delete(`api/v1/TrainingPlan/${trainingId}/plan-exercise/${planExerciseId}`);
  }
}
