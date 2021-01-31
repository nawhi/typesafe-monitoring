export type Search = {
  pickUp: Date;
  dropOff: Date;
  location: string;
};
type Rate = {
  amount: number;
  company: string;
};

export function isPermitted(search: Search): boolean {
  return maybe();
}

export function isTooManyRequests(search: Search): boolean {
  return maybe();
}

export function runSearch(search: Search): Rate[] {
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
