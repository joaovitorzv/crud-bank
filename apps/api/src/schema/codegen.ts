import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `${__dirname}/schema.graphql`,
  generates: {
    [`${__dirname}/resolvers-types.ts`]: {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};
export default config;
