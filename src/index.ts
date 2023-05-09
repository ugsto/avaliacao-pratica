import {logger} from '@/loaders/logger';
import {dataSource, initializeDatabase} from './loaders/database';
import {Student} from './models/student/entity';

async function main() {
  const database = await initializeDatabase(dataSource);

  logger.info('Database initialized');

  await database.getRepository(Student).save({
    name: 'John',
    surname: 'Doe',
    email: 'foo@bar.com',
    birthDate: new Date(),
    registrationNumber: 123_456,
  });

  logger.info('Student saved');

  logger.info({students: await database.getRepository(Student).find()});
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
