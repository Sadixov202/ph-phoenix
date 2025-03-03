import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class HttpsService {
  // headers = new HttpHeaders().set('Content-type', 'text/plain');
  // // tslint:disable-next-line: variable-name
  // post_headers = new HttpHeaders().set('Content-type', 'text/plain');
  constructor() { }

  public rootUrl: string = 'https://' + environment.host;

  get(http: HttpClient, resourceUrl: string, params: any = {}): Observable<any> {
    return http.get<Response>(this.rootUrl + resourceUrl, {
      // tslint:disable-next-line: object-literal-shorthand
      params: params,
    });
  }


  post(http: HttpClient, resourceUrl: string, item: any, params: any = {}): Observable<any> {
    return http.post<Response>(this.rootUrl + resourceUrl, item, {
      // tslint:disable-next-line: object-literal-shorthand
      params: params,
    });
  }


}

