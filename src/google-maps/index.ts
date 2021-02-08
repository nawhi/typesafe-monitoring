import { GoogleMapsClient } from './GoogleMapsClient';

const buckinghamPalace = 'ChIJtV5bzSAFdkgRpwLZFPWrJgo';

const client = new GoogleMapsClient(process.env.MAPS_API_KEY!);

client
  .getPlaceDetails(buckinghamPalace, [
    'formatted_address',
    'formatted_phone_number',
  ])
  .then((details) => console.log('Address:', details.formatted_address))
  .catch(console.error);
