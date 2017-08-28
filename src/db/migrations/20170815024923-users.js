'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
  return queryInterface.createTable(
       'users',
       {
           id: {
               type: Sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true
           },
           createdAt: {
               type: Sequelize.DATE
           },
           updatedAt: {
               type: Sequelize.DATE
           },
           email: {
             type: Sequelize.STRING
           },
           hashedPassword: {
             type: Sequelize.STRING
           },
           token: {
           type: Sequelize.STRING
       }
       }

   )
  },

  down: function (queryInterface, Sequelize) {
  return queryInterface.dropTable('users')
  }
};
