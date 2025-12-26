import 'module-alias/register';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { json } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import depthLimit from 'graphql-depth-limit';
import { applyMiddleware } from 'graphql-middleware';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { servicePermissions } from './permissions';

import packageJson from '../package.json';
import schema from './schema';
import { cirkleLogger, logger } from './utils/logger';
import { generateReferenceId, returnSuccessHTTPResponse } from './utils/misc';
import { authenticateUser } from './schema/user/services';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { user } from '@prisma/client';

dotenv.config();
const { PORT, NODE_ENV } = process.env;

const app = express();

app.use(cors());

const startServer = async () => {
  let permissions;
  permissions = servicePermissions;

  const server = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    introspection: NODE_ENV !== 'PROD',
    plugins: [cirkleLogger,
      process.env.NODE_ENV === 'PROD'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageLocalDefault({ embed: false }),],
    validationRules: [depthLimit(6)],
  });

  const serverInternal = new ApolloServer({
    schema: applyMiddleware(schema, servicePermissions),
    introspection: true,
    plugins: [cirkleLogger],
    validationRules: [depthLimit(6)],
  });

  await server.start();
  await serverInternal.start();
  app.use(graphqlUploadExpress());

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        let user: user | null = null;
        let sessionToken = '';
        try {
          user = await authenticateUser(req);
          sessionToken = req.headers.authorization as string;
        } catch (e) {
          // Don't throw here, just leave user as null
        }
        return {
          sessionToken,
          currentUser: user,
          requestId: generateReferenceId(4),
          dataSources: {},
        };
        // const { authorization: sessionToken } = req.headers;
        // let user = await authenticateUser(req);
        // return {
        //   sessionToken,
        //   currentUser: user,
        //   requestId: generateReferenceId(4),
        // };
      },
    })
  );

  // Internal endpoint for codegen
  app.use('/graphql-internal', cors<cors.CorsRequest>(), json());
};

app.use(
  express.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true,
  })
);

app.use(
  express.json({
    limit: '50mb',
  })
);
app.get('/version', (_req: Request, res: Response): void => {
  getVersion(res);
});

startServer();
app.listen({ port: PORT }, async () => {
  logger.info(`Apollo Server on http://localhost:${PORT}/graphql`);
});

export async function getVersion(res) {
  if (res) return returnSuccessHTTPResponse(packageJson.version, res);
  return { number: packageJson.version };
}
