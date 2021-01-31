export const SEARCH_REQUEST_SCHEMA = {
  body: {
    type: 'object',
    properties: {
      search: {
        type: 'object',
        properties: {
          pickUp: { type: 'string', format: 'date-time' },
          dropOff: { type: 'string', format: 'date-time' },
          location: { type: 'string' }
        },
        required: ['pickUp', 'dropOff', 'location']
      }
    },
    required: ['search']
  }
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
