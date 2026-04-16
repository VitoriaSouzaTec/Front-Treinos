import "dotenv/config";
import { defineConfig } from "orval";

export default defineConfig({
  treinos: {
    input: "./app/_lib/api/swagger.json",
    output: {
      target: "./app/_lib/api/fetch-generated/index.ts",
      client: "fetch",
      override: {
        mutator: {
          path: "./app/_lib/fetch.ts",
          name: "customFetch",
        },
      },
    },
  },
});