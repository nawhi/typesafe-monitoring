import { FastifyInstance } from 'fastify';
import {
  isPermitted,
  isTooManyRequests,
  runSearch,
  Search,
  SEARCH_REQUEST_SCHEMA,
} from './common';

export const v1 = async (server: FastifyInstance) => {
  server.post<{ Body: { search: Search } }>('/v1', {
    schema: SEARCH_REQUEST_SCHEMA,
    handler: async (req, res) => {
      const { search } = req.body;

      if (!isPermitted(search)) {
        return res.forbidden();
      }

      if (isTooManyRequests(search)) {
        return res.tooManyRequests();
      }

      return runSearch(search)
        .then((result) => ({ result }))
        .catch((e) => res.internalServerError(e.message));
    },
  });
};
