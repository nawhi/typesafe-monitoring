import { Rate, Search } from './types';

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
