import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "higu2g",

  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
