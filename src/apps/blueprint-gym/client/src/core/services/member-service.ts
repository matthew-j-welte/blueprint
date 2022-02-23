import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MemberAccountDto,
  MemberAccountFormChoicesDto,
  MemberLookupDto,
  MemberLoginDto,
  MemberNotificationDto,
} from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) {}

  public getMemberAccount(memberId: string): Observable<MemberAccountDto> {
    return this.http.get<MemberAccountDto>(`/Member/get-account/${memberId}`);
  }

  public login(memberLogin: MemberLoginDto): Observable<MemberAccountDto> {
    return this.http.post<MemberLoginDto>('/Member/login', memberLogin);
  }

  public register(memberRegistration: MemberAccountDto): Observable<MemberAccountDto> {
    return this.http.post<MemberAccountDto>('/Member/register', memberRegistration);
  }

  public updateAccountInfo(memberAccount: MemberAccountDto): Observable<MemberAccountDto> {
    return this.http.put<MemberAccountDto>('/Member/update-account', memberAccount);
  }

  public getMemberAccountFormChoices(): Observable<MemberAccountFormChoicesDto> {
    return this.http.get<MemberAccountFormChoicesDto>('/Member/get-registration-form-choices');
  }

  public searchMembers(lookupText: string): Observable<MemberLookupDto[]> {
    return this.http.get<MemberLookupDto[]>(`/Member/search-members/${lookupText}`);
  }

  public getNotifications(memberNotificationsId: string): Observable<MemberNotificationDto[]> {
    return this.http.get<MemberNotificationDto[]>(
      `/Member/member-notifications/${memberNotificationsId}`
    );
  }

  public postNotification(notification: MemberNotificationDto): Observable<MemberNotificationDto> {
    return this.http.post<MemberNotificationDto>('/Member/post-notification', notification);
  }

  public getMembers(): Observable<MemberLookupDto[]> {
    return this.http.get<MemberLookupDto[]>(`/Member/get-members`);
  }
}
