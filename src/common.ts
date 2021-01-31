import { Rate, Search } from "./types";
import { FastifyLoggerInstance } from "fastify";

export function isPermitted(_: Search): boolean {
  return maybe();
}

export function isTooManyRequests(_: Search): boolean {
  return maybe();
}

export function runSearch(_: Search): Rate[] {
  if (maybe()) {
    throw new Error("request failed");
  }
  return [
    { amount: 100, company: "Super Wheelz" },
    { amount: 200, company: "Turbo Hires" },
    { amount: 300, company: "Premium Rides" },
  ];
}

const maybe = () => Boolean(Math.floor(Math.random() + 0.5));

interface Monitor {
  register(event: string, tags: { [k: string]: string }): void;
}

/**
 * This example just produces a log of the event, but in a production
 * situation it might send the events to a third-party monitoring solution
 * such as Datadog.
 */
export class MonitorStub implements Monitor {
  constructor(private logger: FastifyLoggerInstance) {}

  register(event: string, tags: { [k: string]: string }): void {
    this.logger.info({ event, tags });
  }
}
