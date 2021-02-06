"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = __importDefault(require("fastify"));
var fastify_sensible_1 = __importDefault(require("fastify-sensible"));
var v1_1 = require("./v1");
var v2_1 = require("./v2");
var v3_1 = require("./v3");
var v4_1 = require("./v4");
var port = 8000;
fastify_1.default({ logger: true })
    .register(fastify_sensible_1.default)
    .register(v1_1.v1)
    .register(v2_1.v2)
    .register(v3_1.v3)
    .register(v4_1.v4)
    .listen({ port: port });
