import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, tick, fakeAsync } from '@angular/core/testing';

import { PersonComponent, User } from './person.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Response, ResponseOptions, Http, HttpModule } from '@angular/http';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  // tslint:disable-next-line:prefer-const
  let backend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          // tslint:disable-next-line:no-shadowed-variable
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    backend = TestBed.get(MockBackend);
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    const email = component.form.controls['email'];

    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue('test');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    email.setValue('test@example.com');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    const password = component.form.controls['password'];

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue('123456');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    password.setValue('123456789');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

  it('submitting a form emits a user', () => {
    expect(component.form.valid).toBeFalsy();

    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('123456789');

    expect(component.form.valid).toBeTruthy();

    let user: User;

    component.loggedIn.subscribe((value) => user = value);

    component.login();

    expect(user.email).toBe('test@test.com');
    expect(user.password).toBe('123456789');
  });

  it('getUser should return User', fakeAsync(() => {
    const user = new User('cyf', 'xxxx');

    const options = new ResponseOptions({status: 200, body: {data: user}});
    const response = new Response(options);

    backend.connections.subscribe(connection => {
      console.log('url:' + connection.request.url);
      connection.mockRespond(response);
    });

    component.getUser().toPromise()
        .then(res => {
          expect(res.email).toBe('cyf');
    });
  }));
});
