import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { TokenService } from '../token/token.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  let fixture: ComponentFixture<LoginComponent>;

  (globalThis as any).google = {
    accounts: {
      id: {
        initialize: () => {},
        renderButton: () => {},
        prompt: () => {},
      },
    },
  };

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('TokenService', ['setToken']);

    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [{ provide: TokenService, useValue: spy }]
    });

    tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Google Sign-In button container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#google-signin-button')).toBeTruthy();
  });

  it('should save the JWT token', () => {
    const response = {
      credential: 'test-jwt-token'
    };
    component.handleCredentialResponse(response);
    expect(tokenServiceSpy.setToken).toHaveBeenCalledWith('test-jwt-token');
  });
});
