import { FastifyRequest } from "fastify";

export interface Filter extends FastifyRequest {
  query: {
    offset: number;
    limit: number;
    filter: string;
  };
}
