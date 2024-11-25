import { WeatherWidgetComponent } from './weather-widget.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [WeatherWidgetComponent],
  imports: [SharedModule],
  exports: [WeatherWidgetComponent],
})
export class WeatherWidgetModule {}
