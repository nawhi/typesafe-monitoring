import { FastifyInstance, FastifyLoggerInstance } from "fastify";
import { isPermitted, isTooManyRequests, runSearch, Search, SEARCH_REQUEST_SCHEMA } from './common';

type RequestOutcome = "success" | "rate-limited" | "forbidden" | "error";

interface Monitor {
  registerRequest(outcome: RequestOutcome, location: string): void;
  registerOtherMetric1(): void;
  registerOtherMetric2(name: string): void;
}

class MonitorStub implements Monitor {
  constructor(private logger: FastifyLoggerInstance) {}

  registerRequest(outcome: RequestOutcome, location: string): void {
    this.logger.info({
      event: "awesome-corp.brilliant-dept.request",
      tags: { outcome, location },
    });
  }

  registerOtherMetric1(): void {
    this.logger.info({
      event: "awesome-corp.brilliant-dept.some-other-metric-used-elsewhere",
      tags: {},
    });
  }

  registerOtherMetric2(name: string): void {
    this.logger.info({
      event: "awesome-corp.brilliant-dept.some-other-metric-2",
      tags: { name },
    });
  }
}

export const v4 = async (server: FastifyInstance) => {
  const monitor = new MonitorStub(server.log);
  server.post<{ Body: { search: Search } }>("/v4", {
    schema: SEARCH_REQUEST_SCHEMA,
    handler: async (req, res) => {
      const { search } = req.body;

      if (!isPermitted(search)) {
        monitor.registerRequest("forbidden", search.location);
        return res.forbidden();
      }

      if (isTooManyRequests(search)) {
        monitor.registerRequest("rate-limited", search.location);
        return res.tooManyRequests();
      }

      try {
        const result = await runSearch(search);
        monitor.registerRequest("success", search.location);
        return { result };
      } catch (e) {
        monitor.registerRequest("error", search.location);
        return res.internalServerError(e.message);
      }
    },
  });
};
