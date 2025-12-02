import 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from './apollo/index';

const startServer = async () => {
    try {
        const server = new ApolloServer({ schema });

        const { url } = await startStandaloneServer(server, {
            listen: { port: Number(process.env.PORT) }
        });

        console.log('🚀 Subgraph ready at ' + url);
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

startServer();
