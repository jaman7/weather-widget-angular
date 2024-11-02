import { Component, OnInit, Input } from '@angular/core';
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
  @Input() cities: string[] = [];

  public selectedCities$: Observable<IWeatherData[]> = of([]);

  public refreshCountdown$: Observable<number>;

  public citySelectionCountdown$: Observable<number>;

  public refreshProgress$: Observable<number>;

  public citySelectionProgress$: Observable<number>;

  ngOnInit(): void {
    const refreshInterval = 10000;
    const citySelectionInterval = 60000;

    const refresh$ = timer(0, refreshInterval);
    const citySelection$ = timer(0, citySelectionInterval).pipe(
      untilDestroyed(this),
      map(() => this.getRandomCities()),
      shareReplay(1)
    );

    this.refreshCountdown$ = timer(0, 1000).pipe(
      untilDestroyed(this),
      map(tick => refreshInterval / 1000 - (tick % (refreshInterval / 1000)))
    );

    this.citySelectionCountdown$ = timer(0, 1000).pipe(
      untilDestroyed(this),
      map(tick => citySelectionInterval / 1000 - (tick % (citySelectionInterval / 1000)))
    );

    this.refreshProgress$ = this.refreshCountdown$.pipe(
      untilDestroyed(this),
      map(timeLeft => (timeLeft / (refreshInterval / 1000)) * 100)
    );

    this.citySelectionProgress$ = this.citySelectionCountdown$.pipe(
      untilDestroyed(this),
      map(timeLeft => (timeLeft / (citySelectionInterval / 1000)) * 100)
    );

    this.selectedCities$ = citySelection$.pipe(
      untilDestroyed(this),
      switchMap(cities => refresh$.pipe(switchMap(() => this.loadWeatherData(cities))))
    );
  }

  loadWeatherData(cities: string[]): Observable<IWeatherData[]> {
    const weatherObservables = cities.map(city => this.getWeather(city));
    return combineLatest(weatherObservables);
  }

  getRandomCities(): string[] {
    return this.cities?.length ? [...this.cities].sort(() => 0.5 - Math.random())?.slice(0, 3) : [];
  }

  openCity(id: number): void {
    window.open(`https://openweathermap.org/city/${id}`, '_blank');
  }
}
