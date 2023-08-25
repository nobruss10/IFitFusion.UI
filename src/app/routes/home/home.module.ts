import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts';
import { HomeService } from './home.service';
import { AgmCoreModule } from '@agm/core';
import 'chartjs-plugin-labels';

import { TrainingPlanModalComponent } from './modals/training-plan-modal/training-plan-modal.component';
import { ExerciseModalComponent } from './modals/exercise-modal/exercise-modal.component';
import { ExerciseComponent } from './exercise/exercise.component';


const routes: Routes = [
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [
        SharedModule,
        Ng2ChartsModule,
        RouterModule.forChild(routes),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCJAAaLBCyZ_owKUt8c3MkXZQ5TnfS4Bko',
            libraries: ['places']
        })
    ],
    declarations: [
        HomeComponent, 
        TrainingPlanModalComponent, ExerciseModalComponent, ExerciseComponent
    ],
    providers: [
        HomeService
    ],
    exports: [
        RouterModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
})
export class HomeModule { }