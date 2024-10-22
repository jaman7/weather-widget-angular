import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';
import { WeatherWidgetModule } from '@app/components/commons/weather-widget/weather-widget.module';
import { MapModule } from '@app/components/commons/map/map.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule, TranslateModule, WeatherWidgetModule, MapModule],
})
export class HomeModule {}
