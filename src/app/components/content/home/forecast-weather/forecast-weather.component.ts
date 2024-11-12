import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexFill, ApexMarkers, ApexXAxis, ApexYAxis, ApexTooltip } from 'ng-apexcharts';
import { IForecast } from '../home.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
})
export class ForecastWeatherComponent implements OnInit, OnChanges {
  @Input() forecast: IForecast[] = [];

  @ViewChild('forecastTiles') forecastTilesRef!: ElementRef;

  chartOptions!: Partial<ChartOptions>;

  isDragging = false;

  startX = 0;

  scrollLeft = 0;

  ngOnInit(): void {
    this.setupChartOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.forecast) {
      this.setupChartOptions();
    }
  }

  private setupChartOptions(): void {
    const labels = this.forecast.map(f => new Date((f.dt ?? 0) * 1000).toLocaleString('en-US', { weekday: 'short', hour: 'numeric' }));
    const temperatureData = this.forecast.map(f => f.main?.temp ?? null);

    this.chartOptions = {
      series: [{ name: 'Temperature', data: temperatureData }],
      chart: { type: 'line', zoom: { enabled: false }, toolbar: { show: false } },
      xaxis: { categories: labels },
      yaxis: { title: { text: 'Temperature (°C)' } },
      markers: { size: 5, colors: ['#FF4560'] },
      fill: { type: 'gradient', gradient: { shade: 'light', type: 'vertical', opacityFrom: 0.7, opacityTo: 0.4 } },
      tooltip: { shared: true, intersect: false },
    };
  }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.pageX - this.forecastTilesRef.nativeElement.offsetLeft;
    this.scrollLeft = this.forecastTilesRef.nativeElement.scrollLeft;
  }

  onMouseLeave(): void {
    this.isDragging = false;
  }

  onMouseUp(): void {
    this.isDragging = false;
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    const x = event.pageX - this.forecastTilesRef.nativeElement.offsetLeft;
    const scroll = (x - this.startX) * 2;
    this.forecastTilesRef.nativeElement.scrollLeft = this.scrollLeft - scroll;
  }
}
