import server from './server';
import { PORT } from './config/config';
import Sequelize from 'sequelize';
import db from './config/database';

db.sync().then(() => {
  server.listen(PORT, () => console.log(`server is running at ${PORT}`));
});
