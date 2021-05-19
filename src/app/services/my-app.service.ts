import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyAppService {
  constructor(private http: HttpClient) {}

  test() {
    return this.http.get('http:baidu.com').toPromise();
  }
}
