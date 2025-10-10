import {TokenService} from './token.service';
import {TestBed} from '@angular/core/testing';

describe('TokenService', () => {
  const TOKEN_KEY = 'accessToken';
  const sessionStorageMock = {};
  let subject: TokenService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService]
    });
    subject = TestBed.inject(TokenService);
  });

  it(' should store the provided token', () => {
    spyOn(sessionStorage, 'setItem').and.callFake((key: string, value: string) => {
      // @ts-ignore
      sessionStorageMock[key] = value;
    });

    const token = 'test-token';
    subject.setToken(token);
    expect(sessionStorage.setItem).toHaveBeenCalledWith(TOKEN_KEY, token);
  });

  it(' should retrieve a stored token', () => {
    expect(subject.getToken()).toBeNull();

    spyOn(sessionStorage, 'getItem')
      .and.callFake((key: string) => {
        // @ts-ignore
        return 'test-token';
      });

    const token = 'test-token';
    expect(subject.getToken()).toBe(token);
    expect(sessionStorage.getItem).toHaveBeenCalledWith(TOKEN_KEY);
  });

  it(' should clear a stored token', () => {
    spyOn(sessionStorage, 'removeItem')
      .and.callFake(() => {
        for (const key in sessionStorageMock) {
          // @ts-ignore
          delete sessionStorageMock[key];
        }
      });

    subject.clearToken();
    expect(sessionStorage.removeItem).toHaveBeenCalledWith(TOKEN_KEY);
  });
});
