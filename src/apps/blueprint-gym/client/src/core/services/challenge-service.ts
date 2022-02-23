import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChallengeDashboardViewModel, ChallengeDto } from '../models/challenge.model';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  constructor(private http: HttpClient) {}

  public submitNewChallenge(challenge: ChallengeDto): Observable<ChallengeDto> {
    return this.http.post<ChallengeDto>('/Challenge/new-challenge', challenge);
  }

  public getTrainingDashboard(challengeId: string): Observable<ChallengeDashboardViewModel> {
    return this.http.get<ChallengeDashboardViewModel>(
      `/Challenge/get-challenge-dashboard/${challengeId}`
    );
  }
}
