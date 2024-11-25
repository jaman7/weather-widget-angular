import { MapLegendComponent } from './components/map-legend/map-legend.component';
import { MapSearchComponent } from './components/map-search/map-search.component';
import { MapViewComponent } from './components/map-view.component';
import { MapPopupComponent } from './components/maps-popup/maps-popup.component';
import { MapMousePositionComponent } from './components/mouse-position';
import { MapScalelineComponent } from './components/scaleline.component';
import { SidebarControlsComponent } from './components/sidebar-controls/sidebar-controls.component';
import { MapComponent } from './map.component';
import { ButtonModule } from '../button/button.module';
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';
import { DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [
    MapComponent,
    SidebarControlsComponent,
    MapViewComponent,
    MapScalelineComponent,
    MapMousePositionComponent,
    MapLegendComponent,
    MapPopupComponent,
    MapSearchComponent,
  ],
  imports: [SharedModule, ButtonModule, FormsModule],
  providers: [DecimalPipe, { provide: OverlayContainer, useClass: FullscreenOverlayContainer }],
  exports: [MapComponent],
})
export class MapModule {}
