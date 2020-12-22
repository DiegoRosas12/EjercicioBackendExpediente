import Sequelize from 'sequelize';
import { DB } from './config';

export default new Sequelize(DB.database, DB.username, DB.password, {
  host: DB.host,
  dialect: DB.dialect,
});
