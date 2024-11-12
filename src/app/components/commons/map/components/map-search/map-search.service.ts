import { Injectable } from '@angular/core';
import { HttpService } from '@app/core';
import { map, Observable } from 'rxjs';
import { MAPBOX_API_KEY } from '@app/components/commons/map/map.constants';
import { ISearchData } from './map-search.models';

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
    return this.get<ISearchData[]>(this.baseUrl, { params }, true).pipe(
      map((data: any) => {
        const { features } = data || {};
        return (
          features?.map((item: any) => {
            const { id, geometry, properties } = item || {};
            return {
              id,
              geometry,
              properties,
              displayName: properties?.full_address,
            };
          }) ?? []
        );
      })
    );
  }
}
