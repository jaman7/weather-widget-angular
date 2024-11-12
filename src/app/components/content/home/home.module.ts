import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';
import { WeatherWidgetModule } from '@app/components/commons/weather-widget/weather-widget.module';
import { MapModule } from '@app/components/commons/map/map.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastWeatherComponent } from './forecast-weather/forecast-weather.component';

@NgModule({
  declarations: [HomeComponent, CurrentWeatherComponent, ForecastWeatherComponent],
  imports: [SharedModule, HomeRoutingModule, TranslateModule, WeatherWidgetModule, MapModule, NgApexchartsModule],
})
export class HomeModule {}
