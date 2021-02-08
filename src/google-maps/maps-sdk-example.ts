import { Client, Place } from '@googlemaps/google-maps-services-js';

class GoogleMapsClient {
  private client: Client = new Client();

  constructor(private apiKey: string) {}

  public async getPlaceDetails<K extends keyof Place>(
    placeId: string,
    fields?: K[]
  ): Promise<Pick<Place, K>>{
    const details = await this.client.placeDetails({
      params: { key: this.apiKey, place_id: placeId, fields },
    });
    return details.data.result;
  }
}

const buckinghamPalace = 'ChIJtV5bzSAFdkgRpwLZFPWrJgo';
const client = new GoogleMapsClient(process.env.MAPS_API_KEY!);

client
  .getPlaceDetails(buckinghamPalace, ['formatted_address', "formatted_phone_number"])
  .then((details) => console.log('Address:', details.formatted_address))
  .catch(console.error);
