/* eslint-disable @typescript-eslint/no-explicit-any */
import { HomeService } from './home.service';
import { Component } from '@angular/core';
import { ISearchData } from '@app/components/commons/map/components/map-search/map-search.models';
import { sunsetSunrise } from '@app/shared/utils/utils';
import { catchError, combineLatest, lastValueFrom, map, of, shareReplay } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  cities = ['Lodz', 'Warszawa', 'Berlin', 'New York', 'London'];

  weatherData: any = {};

  constructor(public homeService: HomeService) {}

  fetchWeatherData(data: ISearchData): void {
    const { city, latitude, longitude } = data || {};
    combineLatest([lastValueFrom(this.homeService.getWeather(city)), lastValueFrom(this.homeService.getForecast(latitude, longitude))])
      .pipe(
        map(([weather, forecast]): void => {
          if (weather && forecast?.list?.length) {
            const sunset = sunsetSunrise(weather?.sys?.sunset || 0);
            const sunrise = sunsetSunrise(weather?.sys?.sunrise || 0);
            this.weatherData = {
              ...weather,
              sunrise,
              sunset,
              city: forecast?.city || null,
              forecast: forecast?.list || [],
            };
          }
        }),
        shareReplay(1),
        catchError(() => of(false))
      )
      .subscribe();
  }

  setSearchTerm(data: ISearchData): void {
    if (data) this.fetchWeatherData(data);
  }
}
