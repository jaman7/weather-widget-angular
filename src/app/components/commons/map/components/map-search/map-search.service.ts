/* eslint-disable @typescript-eslint/naming-convention */
import { IMapboxFeature, IMapboxResponse, ISearchData } from './map-search.models';
import { Injectable } from '@angular/core';
import { MAPBOX_API_KEY } from '@app/components/commons/map/map.constants';
import { HttpService } from '@app/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapSearchService extends HttpService {
  private baseUrl = 'https://api.mapbox.com/search/geocode/v6/forward';

  getData(searchTerm: string): Observable<ISearchData[]> {
    const params = {
      q: searchTerm,
      limit: 10,
      access_token: MAPBOX_API_KEY,
    };
    return this.get<IMapboxResponse>(this.baseUrl, { params }, true).pipe(
      map((data: IMapboxResponse) => {
        const { features = [] } = data || {};
        return features.map((feature: IMapboxFeature) => {
          const {
            id,
            properties: { name = '', full_address = '', coordinates = {} },
          } = feature || {};
          const { latitude, longitude } = coordinates || {};
          return {
            id,
            latitude,
            longitude,
            city: name || '',
            displayName: full_address || '',
          } as ISearchData;
        });
      })
    );
  }
}
