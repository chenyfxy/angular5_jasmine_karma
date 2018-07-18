import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  results: SearchItem[];
  statusVal: any;

  constructor(private fb: FormBuilder, public http: Http) {
    this.results = [];
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

export class SearchItem {
  constructor(public name: string,
              public artist: string,
              public thumbnail: string,
              public artistId: string) {
  }
}
