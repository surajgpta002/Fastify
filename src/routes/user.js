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
  fastify.post("/api/users", { schema: createUserSchema }, (request, reply) => {
    reply.code(201);
    return {
      id: "Suraj20xeh",
    };
  });
}

export default userRouter;
