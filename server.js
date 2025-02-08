import Fastify from "fastify";
import userRouter from "./src/routes/user.js";
import "dotenv/config";
import fastifyMongodb from "@fastify/mongodb";

const fastify = Fastify({
  logger: true,
});

fastify.register(userRouter);

// DataBase
fastify.register(fastifyMongodb, {
  forceClose: true,
  url: process.env.DB_URL,
});

fastify.get("/", async (req, res) => {
  return {
    message: "helooo world",
  };
});

const start = async () => {
  const portNumber = process.env.PORT;

  try {
    await fastify.listen({ port: portNumber });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
