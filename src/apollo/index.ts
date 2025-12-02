import path from 'path';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

// Load and merge all type definitions into a single schema
const typeDefs = mergeTypeDefs(
    loadFilesSync(path.resolve('./**/apollo/**/*.gql'))
);

// Load and merge all resolver files into a single resolver object
const resolvers: any = mergeResolvers(
    loadFilesSync(path.resolve('./**/apollo/**/*.r.ts'))
);

// Create an executable GraphQL schema
const schema = buildSubgraphSchema({ typeDefs, resolvers });

export { schema };
