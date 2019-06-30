const Sequelize = require('sequelize');

const sequelize = new Sequelize('deadhead', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});

const Model = Sequelize.Model;

class News extends Model {}
News.init({
  title: {
      type: Sequelize.STRING,
      allowNull: false
  }
}, {
  sequelize,
  modelName: 'news'
});

sequelize.sync();

News.create({title: 'This is a test of the Deadhead DB'})
  .then(test => {
    console.log('Test title auto ID:', test.id);
  });