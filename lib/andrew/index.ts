import Client, { BaseURL, Environment, Local } from "./client.gen";

const baseURL: BaseURL =
  process.env.ANDREW_ENVIRONMENT && process.env.ANDREW_ENVIRONMENT != "local"
    ? Environment(process.env.ANDREW_ENVIRONMENT)
    : Local;

export const Andrew = new Client(baseURL, {
  auth: process.env.ANDREW_API_TOKEN,
});
