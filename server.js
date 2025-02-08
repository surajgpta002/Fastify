import Fastify from "fastify";
import userRouter from "./src/routes/user.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(userRouter)

fastify.get("/", async (req, res) => {
  return {
    message: "helooo world",
  };
});

const start = async () => {
  const PORT = process.env.PORT || 8080;

  try {
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
