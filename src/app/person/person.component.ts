import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @Output() loggedIn = new EventEmitter<User>();
  form: FormGroup;
  statusVal: any;

  constructor(private fb: FormBuilder, public http: Http) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)]],
    });
  }

  login() {
    console.log(`Login ${this.form.value.email}`);
    if (this.form.valid) {
      this.loggedIn.emit(
        new User(
            this.form.value.email,
            this.form.value.password
        )
    );
    }
  }

  getUser() {
    this.http.get('/api/first');

    return this.http.get('/api/status').pipe(
      map((r: Response) => r.json().data as User)
    );
  }
}

export class User {
  constructor(public email: string,
              public password: string) {
  }
}

////////// Services ///////////////
@Injectable()
export class ValueService {
  protected value = 'real value';

  getValue() { return this.value; }
  setValue(value: string) { this.value = value; }
}

@Injectable()
export class MasterService {
  count = 10;

  constructor(private valueService: ValueService) { }
  getValue() { return this.valueService.getValue(); }

  getMultiValue() {
    for (let i = 0; i < this.count; i++) {
      this.getValue();
    }
  }
}

