export const SEARCH_REQUEST_SCHEMA = {
  body: {
    type: 'object',
    properties: {
      search: {
        type: 'object',
        properties: {
          pickUp: { type: 'string', format: 'date-time' },
          dropOff: { type: 'string', format: 'date-time' },
          location: { type: 'string' },
        },
        required: ['pickUp', 'dropOff', 'location'],
      },
    },
    required: ['search'],
  },
};
export type Search = {
  pickUp: Date;
  dropOff: Date;
  location: string;
};
export type Rate = {
  amount: number;
  company: string;
};

export function isPermitted(_: Search): boolean {
  return maybe();
}

export function isTooManyRequests(_: Search): boolean {
  return maybe();
}

export function runSearch(_: Search): Rate[] {
  if (maybe()) {
    throw new Error('request failed');
  }
  return [
    { amount: 100, company: 'Super Wheelz' },
    { amount: 200, company: 'Turbo Hires' },
    { amount: 300, company: 'Premium Rides' },
  ];
}

const maybe = () => Boolean(Math.floor(Math.random() + 0.5));
