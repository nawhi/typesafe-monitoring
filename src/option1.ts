import fastify from "fastify";
import fastifySensible from "fastify-sensible";
import { isPermitted, isTooManyRequests, runSearch, Search } from "./common";
import S from "fluent-json-schema";

const schema = S.object()
  .prop(
    "search",
    S.object()
      .prop("pickUp", S.string().format(S.FORMATS.DATE_TIME).required())
      .prop("dropOff", S.string().format(S.FORMATS.DATE_TIME).required())
      .prop("location", S.string().required())
      .required()
  )
  .valueOf();

console.log(JSON.stringify(schema));

fastify()
  .register(fastifySensible)
  .post<{ Body: { search: Search } }>("/option1", {
    schema: {
      body: {
        type: "object",
        properties: {
          search: {
            type: "object",
            properties: {
              pickUp: { type: "string", format: "date-time" },
              dropOff: { type: "string", format: "date-time" },
              location: { type: "string" },
            },
            required: ["pickUp", "dropOff", "location"],
          },
        },
        required: ["search"],
      },
    },
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
  })
  .listen({ port: 8000 });
