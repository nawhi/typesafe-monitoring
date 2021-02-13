import { Client, Place } from '@googlemaps/google-maps-services-js';

export class GoogleMapsClient {
  private client: Client = new Client();

  constructor(private apiKey: string) {}

  public async getPlaceDetails<K extends keyof Place>(
    placeId: string,
    fields: [K, ...K[]]
  ): Promise<Pick<Place, K>> {
    const details = await this.client.placeDetails({
      params: { key: this.apiKey, place_id: placeId, fields },
    });
    return details.data.result;
  }
}
