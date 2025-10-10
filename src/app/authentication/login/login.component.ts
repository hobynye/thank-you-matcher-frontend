import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

declare const google: any;

@Component({
  selector: 'app-login',
  imports: [ AsyncPipe ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export
class LoginComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(private readonly tokenService: TokenService) {
    this.isLoggedIn$ = this.tokenService.isLoggedIn$;
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '494338401757-m9qpaf4mjdqr627anp6p4f6t4ehjh0ga.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this)
    });
    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      {theme: 'outline', size: 'large'}
    );
    google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    this.tokenService.setToken(response.credential);
  }
}
