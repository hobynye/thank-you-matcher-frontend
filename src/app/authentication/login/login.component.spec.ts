import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
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
    TestBed.configureTestingModule({
      imports: [LoginComponent],
    });
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
});
