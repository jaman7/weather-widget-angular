import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, of, shareReplay, switchMap, timer } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IWeatherData } from './weather-widget.model';
import { WeatherWidgetService } from './weather-widget.service';

@UntilDestroy()
@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.scss',
})
export class WeatherWidgetComponent extends WeatherWidgetService implements OnInit {
  public selectedCities$: Observable<IWeatherData[]> = of([]);

  currentCities: string[] = [];

  ngOnInit(): void {
    const refresh$ = timer(0, 10000);
    const citySelection$ = timer(0, 60000).pipe(
      untilDestroyed(this),
      map(() => this.getRandomCities()),
      shareReplay(1)
    );

    this.selectedCities$ = citySelection$.pipe(
      untilDestroyed(this),
      switchMap(cities => {
        this.currentCities = cities;
        return refresh$.pipe(switchMap(() => this.loadWeatherData(cities)));
      })
    );
  }

  loadWeatherData(cities: string[]): Observable<IWeatherData[]> {
    const weatherObservables = cities.map(city => this.getWeather(city));
    return combineLatest(weatherObservables);
  }

  getRandomCities(): string[] {
    const shuffled = [...this.cities].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }

  openCity(id: number): void {
    window.open(`https://openweathermap.org/city/${id}`, '_blank');
  }
}
