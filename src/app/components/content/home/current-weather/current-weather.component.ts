import { days, months } from './current-weather.constants';
import { Component, Input } from '@angular/core';
import { IWeatherDataResponce } from '@app/shared/model/weather-data';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
})
export class CurrentWeatherComponent {
  @Input() weatherData?: IWeatherDataResponce | null;

  currentDate: Date = new Date();

  date: string = `${days[this.currentDate.getDay()]} ${this.currentDate.getDate()} ${months[this.currentDate.getMonth()]}`;

  get temperature(): number {
    return Math.floor(this.weatherData?.main?.temp ?? 0);
  }

  get details(): { label: string; value: string | number | null }[] {
    return [
      { label: 'Temp Max', value: `${Math.floor(this.weatherData?.main?.temp_max ?? 0)}°` },
      { label: 'Temp Min', value: `${Math.floor(this.weatherData?.main?.temp_min ?? 0)}°` },
      { label: 'Wind', value: `${this.weatherData?.wind?.speed ?? 0} m/s` },
      { label: 'Humidity', value: `${this.weatherData?.main?.humidity ?? 0}%` },
      { label: 'Sunrise', value: this.weatherData?.sunrise ?? 'N/A' },
      { label: 'Sunset', value: this.weatherData?.sunset ?? 'N/A' },
    ];
  }

  get weatherIconUrl(): string {
    const icon = this.weatherData?.weather?.[0]?.icon;
    return icon ? `https://openweathermap.org/img/wn/${icon}.png` : '';
  }

  get weatherDescription(): string {
    return this.weatherData?.weather?.[0]?.description || 'No description';
  }
}
