import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('finance_app', 'root', 'your_password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});

export default sequelize;
