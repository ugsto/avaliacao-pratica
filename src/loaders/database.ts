import {connect} from 'mongoose';

export async function loadDatabase() {
  await connect('mongodb://localhost:27017/avaliacao-pratica');
}
