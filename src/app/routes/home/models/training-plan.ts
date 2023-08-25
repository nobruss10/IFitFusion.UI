export interface TrainingPlanModel {
    id?: number;
    startDate: any;
    endDate: any;
    plannedExercises: PlannedExercise[];
}

export interface PlannedExercise {
    id?: number,
    exerciseId: number;
    trainingPlanId?: number;
    sets: number;
    repetitions: number;
    weight: number;
    exercise?: Exercise;
}

export interface Exercise {
    id?: number;
    name?: string;
    description?: string;
    muscleGroup?: string;
    requiredEquipment?: string;
    difficultyLevel?: string;
    demonstrationVideoUrl?: string;
    imgUrl?: string;
}

export interface ExerciseRequest {
    id: number;
    name: string;
    description?: string;
    sets: number;
    repetitions: number;
    weight: number;
    imgUrl?: string;
}