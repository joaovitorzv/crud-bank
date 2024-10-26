import request from "supertest-graphql";
import gql from "graphql-tag";
import { createServer } from "../server";

describe("server", () => {
  it("makes successful query", async () => {
    const name = "jhon";

    const { data } = await request(createServer().callback())
      .query(gql/* GraphQL */ `
        query myQuery($name: String) {
          hello(name: $name)
        }
      `)
      .variables({ name });
    console.log("data => ", data);

    expect((data as any).hello).toContain(name);
  });

  // it("status check returns 200", async () => {
  //   await supertest(createServer().callback())
  //     .get("/graphql")
  //     .expect(200)
  //     .then((res) => {
  //       console.log(res.status);
  //       expect(res.status).toBe(200);
  //     });
  // });

  // it("message endpoint says hello", async () => {
  //   await supertest(serv)
  //     .get("/message/jared")
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body.message).toBe("hello jared");
  //     });
  // });
});
