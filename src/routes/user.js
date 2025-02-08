import { authHandler } from "../../hooks/auth.js";

const createUserSchema = {
  body: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: {
        type: "string",
      },
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
      },
    },
  },
};

async function userRouter(fastify, opts) {
  // fastify.addHook("preHandler", (request, reply, done) => {
  //   console.log("Checking Auth...........");
  //   done();
  // });

  fastify.post(
    "/api/users",
    { schema: createUserSchema },
    async (request, reply) => {
      const { name, email, password } = request.body;

      const userCollection = fastify.mongo.db.collection("users");

      const result = await userCollection.insertOne({ name, email, password });

      const insertedId = result.insertedId;

      fastify.log.info(`User Created!! ${insertedId}`);

      reply.code(201);

      return {
        id: insertedId,
      };
    }
  );

  fastify.get("/api/users", async (request, reply) => {
    const { q } = request.query;

    console.log("query", request.query);

    let query = {};

    if (q) {
      query = {
        name: { $regex: q, $options: "i" }, //for case insensitivity
      };
    }

    const userCollection = fastify.mongo.db.collection("users");

    const user = await userCollection.find(query).toArray();

    fastify.log.info(`Users List`);

    return user;
  });

  fastify.get(
    "/api/users/:id",
    { preHandler: authHandler },
    async (request, reply) => {
      const id = new fastify.mongo.ObjectId(request.params.id);

      const userCollection = fastify.mongo.db.collection("users");

      const user = await userCollection.findOne({ _id: id });

      return user;
    }
  );
}

export default userRouter;
