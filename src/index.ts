import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolvers/CountryResolver";
import { startStandaloneServer } from "@apollo/server/standalone";

async function main() {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [CountryResolver],
    });

    const server = new ApolloServer({ schema });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
}

main();