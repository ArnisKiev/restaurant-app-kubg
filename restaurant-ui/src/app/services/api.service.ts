import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestOptionParam } from '../interfaces/request-option-param';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private HOST:string = 'http://localhost:3000/'

  constructor(
    private httpClient: HttpClient
  ) { }

  public get<T>(url: string, params?: RequestOptionParam[] ): Observable<T> {

    let httpParams = new HttpParams();

    if (params?.length) {
      params.forEach(param => httpParams = httpParams.set(param.propertyName, param.propertyValue));
    }

    const fullUrlPath = this.generateUrlEndPoint(url);
    return this.httpClient.get<T>(fullUrlPath, { params: httpParams });
  }

  public post<T>(url: string, data: T): Observable<T> {
    const fullUrlPath = this.generateUrlEndPoint(url);
    return this.httpClient.post<T>(fullUrlPath, data);
  }

  public put<T>(url: string, data: T): Observable<T> {
    const fullUrlPath = this.generateUrlEndPoint(url);
    return this.httpClient.put<T>(fullUrlPath, data);
  }

  public delete<T>(url: string, data: T): Observable<T> {
    const fullUrlPath = this.generateUrlEndPoint(url);
    return this.httpClient.delete<T>(fullUrlPath, {
      body: data
    });
  }

  private generateUrlEndPoint(url: string): string {
    return this.HOST + url;
  }

}
