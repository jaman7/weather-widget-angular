import { Injectable } from '@angular/core';
import { API_KEY, API_URL } from '@app/components/commons/map/map.constants';
import { HttpService } from '@app/core';
import { IParams } from '@app/core/http/http.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService extends HttpService {
  getWeather(city: string): Observable<any> {
    const params: IParams = {
      q: city,
      appid: API_KEY,
      units: 'metric',
    };

    return this.get(`${API_URL}/weather`, { params }, true);
  }

  getForecast(lat: number, lon: number): Observable<any> {
    const params: IParams = {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
    };

    return this.get(`${API_URL}/forecast`, { params }, true);
  }
}
