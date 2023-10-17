import { ApolloServer } from "@apollo/server";
import mongoose from "mongoose";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
const MONGO_DB = "mongodb://127.0.0.1:27017/AVGO";
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
await mongoose
    .connect(MONGO_DB)
    .then(() => {
    startStandaloneServer(server, {
        listen: { port: 4000 },
    });
})
    .then(() => {
    console.log("server ready at: http://localhost:4000");
});
