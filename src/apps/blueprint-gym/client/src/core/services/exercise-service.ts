import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ExerciseCardDto,
  ExerciseDetailsViewModel,
  ExerciseSubmissionPreviewDto,
  ExerciseSubmissionViewModel,
  TrainingDashboardViewModel,
} from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  public getTrainingDashboard(): Observable<TrainingDashboardViewModel> {
    return this.http.get<TrainingDashboardViewModel>('/Exercise/training-dashboard');
  }

  public submitNewExercise(
    exercise: ExerciseSubmissionViewModel
  ): Observable<ExerciseSubmissionViewModel> {
    return this.http.post<ExerciseSubmissionViewModel>('/Exercise/new-submission', exercise);
  }

  public getExerciseCards(): Observable<ExerciseCardDto[]> {
    return this.http.get<ExerciseCardDto[]>('/Exercise/exercise-cards');
  }

  public getExerciseDetailsById(exerciseId: string): Observable<ExerciseDetailsViewModel> {
    return this.http.get<ExerciseDetailsViewModel>(`/Exercise/exercise-details/${exerciseId}`);
  }

  public startExerciseReview(exerciseId: string): Observable<ExerciseDetailsViewModel> {
    return this.http.get<ExerciseDetailsViewModel>(
      `/Exercise/start-exercise-submission-review/${exerciseId}`
    );
  }

  public getAllExerciseSubmissionPreviews(): Observable<ExerciseSubmissionPreviewDto[]> {
    return this.http.get<ExerciseSubmissionPreviewDto[]>('/Exercise/exercise-submission-previews');
  }

  public submitApprovedExercise(
    exercise: ExerciseDetailsViewModel
  ): Observable<ExerciseDetailsViewModel> {
    return this.http.put<ExerciseDetailsViewModel>('/Exercise/exercise-approval', exercise);
  }

  public submitRejectedExercise(
    exercise: ExerciseDetailsViewModel
  ): Observable<ExerciseDetailsViewModel> {
    return this.http.put<ExerciseDetailsViewModel>('/Exercise/exercise-rejection', exercise);
  }
}
