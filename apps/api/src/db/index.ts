import { MongoClient } from "mongodb";

const connString = "mongodb://mongodb:27017/admin";
const dbClient = new MongoClient(connString, {
  auth: { username: "admin", password: "woovipass" },
});

export const addUser = async (user: { name: string }) => {
  try {
    await dbClient.connect();
    const db = dbClient.db("woovi-bank");
    const users = db.collection("users");

    const result = await users.insertOne(user);
    console.log("add user result => ", JSON.stringify({ result }, null, 2));

    return result;
  } catch (error) {
    console.error("add user error => ", error);
  } finally {
    await dbClient.close();
  }
};

export const getUsers = async () => {
  try {
    await dbClient.connect();
    const db = dbClient.db("woovi-bank");
    const users = db.collection("users");
    return await users.find().toArray();
  } catch (error) {
    console.error("get users error =>", console.log({ error }));
  } finally {
    await dbClient.close();
  }
};
