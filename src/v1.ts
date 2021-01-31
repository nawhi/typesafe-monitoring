import { FastifyInstance } from 'fastify';
import { isPermitted, isTooManyRequests, runSearch } from './common';
import { Search, SEARCH_REQUEST_SCHEMA } from './types';

export const v1 = async (server: FastifyInstance)  => {
  server.post<{ Body: { search: Search } }>("/v1", {
    schema: SEARCH_REQUEST_SCHEMA,
    handler: async (req, res) => {
      const { search } = req.body;

      if (!isPermitted(search)) {
        return res.forbidden();
      }

      if (isTooManyRequests(search)) {
        return res.tooManyRequests();
      }

      try {
        return { result: await runSearch(search) };
      } catch (e) {
        return res.internalServerError(e.message);
      }
    },
  });
}
