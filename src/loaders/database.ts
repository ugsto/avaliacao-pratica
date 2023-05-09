import {Student} from '@/models/student/entity';
import {DataSource} from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27_017,
  database: 'test',
  entities: [Student],
});

export async function initializeDatabase(uninitializedDatabase: DataSource) {
  await uninitializedDatabase.initialize();

  return uninitializedDatabase;
}
