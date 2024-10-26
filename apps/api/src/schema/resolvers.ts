import { readFileSync } from "node:fs";
import { Resolvers } from "./resolvers-types";

export const typeDefs = readFileSync(`${__dirname}/schema.graphql`, "utf-8");

export const resolvers: Resolvers = {
  Query: {
    hello: (_, args) => {
      return "Hello world to " + args.name;
    },
    options: (_, args) => {
      const groups = {
        "1": [{ group: "1", name: "Option 1" }],
        "2": [{ group: "1", name: "Option 1" }],
        "3": [{ group: "1", name: "Option 1" }],
      };

      return groups[args.id as keyof typeof groups];
    },
    else: () => "else",
  },
};
