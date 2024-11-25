import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastWeatherComponent } from './forecast-weather/forecast-weather.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { MapModule } from '@app/components/commons/map/map.module';
import { WeatherWidgetModule } from '@app/components/commons/weather-widget/weather-widget.module';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [HomeComponent, CurrentWeatherComponent, ForecastWeatherComponent],
  imports: [SharedModule, HomeRoutingModule, TranslateModule, WeatherWidgetModule, MapModule, NgApexchartsModule],
})
export class HomeModule {}
