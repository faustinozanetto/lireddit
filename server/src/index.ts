import 'reflect-metadata';
import express from 'express';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { MyContext } from './types';
import { __prod__ } from './constants';
import microConfig from './mikro-orm.config';

const main = async () => {
  // Connecting to database
  const orm = await MikroORM.init(microConfig);
  // Running migrations
  await orm.getMigrator().up();

  // Redis setup
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  // Express APP creation
  const app = express();

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: 'asdjnkaskjweg54x45115441s*as*',
      resave: false,
    })
  );

  // Apollo server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log(`Server listening on ${'http://localhost:4000'}`)
  );
};

main().catch((error) => {
  console.error(error);
});
