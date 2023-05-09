import {logger} from '@/loaders/logger';
import {loadDatabase} from './loaders/database';
import {Student} from './models/student/entity';

async function main() {
  await loadDatabase();

  await new Student({
    name: 'John',
    surname: 'Doe',
    email: 'foo@bar.com',
    birthDate: new Date('1990-01-01'),
    registrationNumber: 123_456,
  }).save();

  const students = await Student.find();

  logger.info(students);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main().catch(error => {
  logger.error(error);
});
