import { Injectable } from '@angular/core';
import { MemberAccountDto } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberContextService {
  private loggedIn = false;
  private loggedInMember: MemberAccountDto | undefined;

  constructor() {
    const cachedMember = localStorage.getItem('member') ?? '';
    if (cachedMember) {
      this.loggedInMember = JSON.parse(cachedMember);
      this.loggedIn = true;
    }
  }

  public getMemberAccount = () => this.loggedInMember;
  public isLoggedIn = () => this.loggedIn;

  public login(member: MemberAccountDto): void {
    localStorage.setItem('member', JSON.stringify(member));
    this.loggedInMember = member;
    this.loggedIn = true;
  }

  public logout(): void {
    localStorage.removeItem('member');
    this.loggedInMember = undefined;
    this.loggedIn = false;
  }
}
