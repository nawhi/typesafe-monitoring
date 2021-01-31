import fastify from 'fastify';
import fastifySensible from 'fastify-sensible';
import { option1 } from './option1';

fastify()
  .register(fastifySensible)
  .register(option1)
  .listen({ port: 8000 });
