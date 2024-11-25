import { Injectable } from '@angular/core';
import { API_KEY, API_URL } from '@app/components/commons/map/map.constants';
import { HttpService } from '@app/core';
import { IParams } from '@app/core/http/http.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class WeatherPopupService extends HttpService {
  private baseUrl = `${API_URL}/weather`;

  getWeatherData<T>(lat: number, lon: number): Observable<T> {
    const params: IParams = {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
    };
    return this.get(this.baseUrl, { params }, true);
  }
}
