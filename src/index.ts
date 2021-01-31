import fastify from 'fastify';
import fastifySensible from 'fastify-sensible';
import { v1 } from './v1';
import { v2 } from './v2';
import { v3 } from './v3';
import { v4 } from './v4';

let port = 8000;
fastify({ logger: true })
  .register(fastifySensible)
  .register(v1)
  .register(v2)
  .register(v3)
  .register(v4)
  .listen({ port });
