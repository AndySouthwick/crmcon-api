'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('contacts',
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
           given_name: {
             type: Sequelize.STRING
           },
           family_name: {
             type: Sequelize.STRING
           },
           email: {
             type: Sequelize.STRING
           },
           phone: {
             type: Sequelize.STRING
           },
           affiliate_id: {
               type: Sequelize.INTEGER,
             references: {
               model: 'affiliates',
                 key: 'id'
             }
           }
   })
  },

  down: function (queryInterface, Sequelize) {
      return  queryInterface.dropTable('contacts')
  }
};
