# Type-safe monitoring in TypeScript

A sample project which demonstrates a few ways of using TypeScript features to avoid common sources of developer error.

## The situation
This code simulates a system which makes a request on behalf of a user that may fail for a number of different reasons.

In this system, engineers want to monitor the causes of different types of failure in a business-friendly way so that we can get a quick visual understanding of the throughput of our system, and whether something might have changed that affects this - either in our system, or in something that we depend on.

We also want the system's behaviour to be transparent, so that our friendly product owners / managers / etc understand what's going on and feel empowered to make good commercial decisions based on it.

## The problem
`v1.ts` demonstrates the application code with no monitoring enabled.

A naive approach, such as `v2`, adds monitoring but could be prone to typos across multiple invocations of the method. For example, the name of the metric was misspelled somewhere, or a different word was used in the "outcome" field, it would cause continuity issues and make it more difficult to use the data.

As I discovered, unit tests aren't a huge help for this kind of problem, because they suffer the same propensity to typos as regular code!

## Enter TypeScript
TypeScript features including union and lookup types can help by locking down the set of legal inputs to the code to only correctly-spelled values, so that you only have to type them out once without assistance.

`v3` and `v4` show two different possible ways to implement this.

## Running the code
Start the server with `yarn start`.

Try sending a POST request to any of the `/vX` endpoints with a body like the following:

```json
{
  "search": {
    "pickUp": "2021-01-01T09:00:00+00:00",
    "dropOff": "2021-01-03T11:00:00+00:00",
    "location": "London"
  }
}
```

All endpoints except `v1` log out a message when a metric is registered. The logs are structured, you can filter out the server logs and get just the metric messages by piping the output into [`jq`][1]:

```shell
yarn --silent start | jq 'select(.event == "awesome-corp.brilliant-dept.request")'
```

[1]: https://stedolan.github.io/jq/
