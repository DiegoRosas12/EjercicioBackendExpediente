import server from './server';
import { PORT } from './server/config/config';
import Sequelize from 'sequelize';
import db from './server/config/database';

db.sync().then(() => {
  server.listen(PORT, () => console.log(`server is running at ${PORT}`));
}); 
 