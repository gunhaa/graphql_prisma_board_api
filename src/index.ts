import createApolloServer from './server/server';
import { config } from './config/config';
import { CreateServerResult } from './graphql/types/createServerResult';

const startApolloServer = async () => {
  const { express } = await createApolloServer();
  const port = config.EXPOSE_SERVER_PORT;
  express.listen(port, () => {
    console.log(`Server on! Port : http://localhost:${port}/graphql`);
  });
};

startApolloServer();
