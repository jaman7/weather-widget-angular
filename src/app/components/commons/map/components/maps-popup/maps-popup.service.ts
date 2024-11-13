import { Injectable } from '@angular/core';
import { HttpService } from '@app/core';
import { Observable } from 'rxjs';
import { IParams } from '@app/core/http/http.model';
import { API_KEY, API_URL } from '@app/components/commons/map/map.constants';

@Injectable({
  providedIn: 'root',
})
export abstract class WeatherPopupService extends HttpService {
  private baseUrl = `${API_URL}/weather`;

  getWeatherData(lat: number, lon: number): Observable<any> {
    const params: IParams = {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
    };
    return this.get(this.baseUrl, { params }, true);
  }
}
