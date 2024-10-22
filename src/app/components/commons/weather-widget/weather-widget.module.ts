import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { WeatherWidgetComponent } from './weather-widget.component';

@NgModule({
  declarations: [WeatherWidgetComponent],
  imports: [SharedModule],
  exports: [WeatherWidgetComponent],
})
export class WeatherWidgetModule {}
