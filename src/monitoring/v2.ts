import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import {
  isPermitted,
  isTooManyRequests,
  runSearch,
  Search,
  SEARCH_REQUEST_SCHEMA,
} from './common';

interface Monitor {
  register(event: string, tags: { [k: string]: string }): void;
}

class MonitorStub implements Monitor {
  constructor(private logger: FastifyLoggerInstance) {}

  register(event: string, tags: { [k: string]: string }): void {
    this.logger.info({ event, tags });
  }
}

export const v2 = async (server: FastifyInstance) => {
  const monitor = new MonitorStub(server.log);
  server.post<{ Body: { search: Search } }>('/v2', {
    schema: SEARCH_REQUEST_SCHEMA,
    handler: async (req, res) => {
      const { search } = req.body;

      if (!isPermitted(search)) {
        monitor.register('awesome-corp.brilliant-dept.request', {
          outcome: 'forbidden',
          location: search.location,
        });
        return res.forbidden();
      }

      if (isTooManyRequests(search)) {
        monitor.register('awesome-corp.brilliant-dept.request', {
          outcome: 'rate-limited',
          location: search.location,
        });
        return res.tooManyRequests();
      }

      try {
        const result = await runSearch(search);
        monitor.register('awesome-corp.brilliant-dept.request', {
          outcome: 'success',
          location: search.location,
        });
        return { result };
      } catch (e) {
        monitor.register('awesome-corp.brilliant-dept.request', {
          outcome: 'error',
          location: search.location,
        });
        return res.internalServerError(e.message);
      }
    },
  });
};
