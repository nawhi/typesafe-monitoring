# Datadog with TypeScript

A few ways of integrating custom Datadog metrics into your TypeScript application.



## The server
This is meant to simulate a system which makes a request on behalf of a user that may fail for a number of different reasons.  

In this type of system, engineers and want to monitor the causes of different types of failure in a business-friendly way so that we can get a quick visual understanding of the throughput of our system, and whether something might have changed (either in our system, or in a dependency) that has affected our outcomes.

You can start the server with `yarn start`. Try sending a POST request to any of the `/vX` endpoints with a body like the following:

```json
{
  "search": {
    "pickUp": "2021-01-01T09:00:00+00:00",
    "dropOff": "2021-01-03T11:00:00+00:00",
    "location": "London"
  }
}
```

All endpoints except v1 log out a message when a metric is registered. Since the logs are structured, you can filter to only those logs by piping the output into [`jq`][1]:

```shell
yarn --silent start | jq 'select(.event == "awesome-corp.brilliant-dept.request")'
```

[1]: https://stedolan.github.io/jq/
