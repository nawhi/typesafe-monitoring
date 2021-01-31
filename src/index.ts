import fastify from 'fastify';
import fastifySensible from 'fastify-sensible';
import { v1 } from './v1';
import { v2 } from './v2';

let port = 8000;
fastify({ logger: true })
  .register(fastifySensible)
  .register(v1)
  .register(v2)
  .listen({ port });
