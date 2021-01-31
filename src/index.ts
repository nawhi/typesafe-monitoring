import fastify from 'fastify';
import fastifySensible from 'fastify-sensible';
import { v1 } from './v1';

fastify()
  .register(fastifySensible)
  .register(v1)
  .listen({ port: 8000 });
