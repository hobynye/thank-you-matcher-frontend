import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'accessToken';
  private readonly isLoggedInSubject = new BehaviorSubject<boolean>(!!sessionStorage.getItem(this.TOKEN_KEY));
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() {}

  public setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
    this.isLoggedInSubject.next(true);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  public clearToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedInSubject.next(false);
  }
}
