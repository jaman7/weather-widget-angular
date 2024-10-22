import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '@env/environment';
import { toHttpParams } from './http.utils';
import { HttpOptions, HttpRequestOptions, IParams } from './http.model';

@Injectable()
export abstract class HttpService {
  constructor(public http: HttpClient) {}

  protected get<T>(url: string, options: HttpOptions = {}, useFullUrl: boolean = false): Observable<T> {
    const finalUrl = useFullUrl ? url : env.SERVER_API_URL + url;
    return this.http.get<T>(finalUrl, {
      ...options,
      params: toHttpParams(options.params as IParams),
    });
  }

  protected post<T>(url: string, data: any, options: HttpOptions = {}, useFullUrl: boolean = false): Observable<T> {
    const finalUrl = useFullUrl ? url : env.SERVER_API_URL + url;
    return this.http.post<T>(finalUrl, data, {
      ...options,
      params: toHttpParams(options.params as IParams),
    });
  }

  protected patch<T>(url: string, data: any, options: HttpOptions = {}, useFullUrl: boolean = false): Observable<T> {
    const finalUrl = useFullUrl ? url : env.SERVER_API_URL + url;
    return this.http.patch<T>(finalUrl, data, {
      ...options,
      params: toHttpParams(options.params as IParams),
    });
  }

  protected put<T>(url: string, data: any, options: HttpOptions = {}, useFullUrl: boolean = false): Observable<T> {
    const finalUrl = useFullUrl ? url : env.SERVER_API_URL + url;
    return this.http.put<T>(finalUrl, data, {
      ...options,
      params: toHttpParams(options.params as IParams),
    });
  }

  protected delete<T>(url: string, options: HttpOptions = {}, useFullUrl: boolean = false): Observable<T> {
    const finalUrl = useFullUrl ? url : env.SERVER_API_URL + url;
    return this.http.delete<T>(finalUrl, {
      ...options,
      params: toHttpParams(options.params as IParams),
    });
  }

  protected response(method: string, url: string, options: HttpRequestOptions = {}, useFullUrl: boolean = false): Observable<any> {
    const finalUrl = useFullUrl ? url : env.SERVER_API_URL + url;
    return this.http.request(method, finalUrl, {
      ...options,
      body: options.body,
      params: toHttpParams(options.params as IParams),
    });
  }
}
