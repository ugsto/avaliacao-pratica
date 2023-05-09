import {logger} from '@/loaders/logger';
import {loadDatabase} from './loaders/database';
import {server} from './loaders/server';

async function main() {
  await loadDatabase();

  server.listen(3000, () => {
    logger.info('Server is running on port 3000');
  });
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main().catch(error => {
  logger.error(error);
});
