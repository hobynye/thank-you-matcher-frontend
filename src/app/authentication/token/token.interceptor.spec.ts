import { HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { tokenInterceptor } from './token.interceptor';
import { TokenService } from './token.service';

describe('TokenInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TokenService', ['getToken']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([tokenInterceptor])),
        provideHttpClientTesting(),
        { provide: TokenService, useValue: spy }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should insert the token when logged in', () => {
    const url = '/test';
    tokenServiceSpy.getToken.and.callFake(() => { return 'dummy-token'});

    httpClient.get(url).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer dummy-token');
  });

  it('should not insert the token when not logged in', () => {
    const url = '/test';
    tokenServiceSpy.getToken.and.callFake(() => { return null });

    httpClient.get(url).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.headers.has('Authorization')).toBeFalsy();
  });
});
