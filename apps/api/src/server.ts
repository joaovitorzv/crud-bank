import Koa from "koa";
import { createSchema, createYoga } from "graphql-yoga";
import supertest from "supertest";
import { addUser, getUsers } from "./db";

export const createServer = () => {
  const app = new Koa();
  const yoga = createYoga<Koa.ParameterizedContext>({
    schema: createSchema({
      typeDefs: /* GraphQL */ `
        type Query {
          hello(name: String): String
          listUsers: [UserResponse]
        }

        input UserInput {
          name: String!
        }

        type User {
          name: String
        }

        type UserResponse {
          _id: String
          name: String
        }

        type Mutation {
          addUser(user: UserInput): User
        }
      `,
      resolvers: {
        Query: {
          hello: (something, args) => "ehyyy else " + args.name,
          listUsers: async () => await getUsers(),
        },
        Mutation: {
          addUser: async (_, args) => {
            const createdUser = await addUser(args.user);
            console.info("created user => ", createdUser);
            return { name: args.user.name };
          },
        },
      },
    }),
    logging: true,
  });

  app.use(async (ctx) => {
    const response = await yoga.handleNodeRequestAndResponse(
      ctx.req,
      ctx.res,
      ctx
    );
    ctx.status = response.status;
    response.headers.forEach((value, key) => {
      ctx.append(key, value);
    });
    ctx.body = response.body;
  });

  return app;
};
