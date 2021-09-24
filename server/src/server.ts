import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import express from "express";
import Redis from "ioredis";
import connectRedis from 'connect-redis';
import { buildSchema } from 'type-graphql';
import { createConnection } from "typeorm";
import cors from "cors";
import session from 'express-session';
import { ProductResolver, RestaurantResolver, UserResolver, ReviewResolver } from './resolvers';

async function main() {
    await createConnection();
    const redis = new Redis();
    const RedisStore = connectRedis(session);
    const app = express();

    const corsOptions = {
        credentials: true,
        origin: [
            "http://localhost:3000",
            "https://studio.apollographql.com"
        ]
    };

    const sessionOptions = {
        store: new RedisStore({
            client: redis as any,
        }),
        name: "sid",
        secret: '8989dbbb7dfd3906b2ba480a5ec9e3927e47572a7908f29f75aa14b9d60d14557f97f4ea202e4f62d8eebfc63e96a562a51f844832b2aeeeedf28a98f168b88a',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV  == 'production',
            maxAge: 30 * 60 * 1000 // 30 minutes
        }
    };

    app.use(cors(corsOptions));
    app.use(session(sessionOptions));

    const schema = await buildSchema({
        resolvers: [UserResolver,  RestaurantResolver, ProductResolver, ReviewResolver]
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({req}: any) => ({req})
    });
    await apolloServer.start();

    apolloServer.applyMiddleware({app});

    app.listen(4000, () => console.log('listening on port 4000'));
}

main().catch((error) => console.error(error));
