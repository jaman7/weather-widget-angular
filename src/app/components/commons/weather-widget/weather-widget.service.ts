import { Injectable } from '@angular/core';
import { HttpService } from '@app/core';
import { map, Observable } from 'rxjs';
import { IParams } from '@app/core/http/http.model';
import { IWeatherData } from './weather-widget.model';

@Injectable({
  providedIn: 'root',
})
export abstract class WeatherWidgetService extends HttpService {
  API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  private API_KEY = 'ae98d58d517252f2065829367d320dbb';

  getWeather(city: string): Observable<IWeatherData> {
    const params: IParams = {
      q: city,
      appid: this.API_KEY,
      units: 'metric',
    };
    return this.get<IWeatherData>(this.API_URL, { params }, true).pipe(
      map((data: any) => ({
        id: data.id,
        city: data?.name ?? '',
        temp: data?.main?.temp ?? null,
        description: data?.weather?.[0]?.description ?? '',
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      }))
    );
  }
}
