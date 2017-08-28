'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('affiliates', {
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
        affiliate_fname: {
          type: Sequelize.STRING
        },
        affiliate_lname: {
            type: Sequelize.STRING
        },
        affiliate_phone: {
            type: Sequelize.STRING
        },
        affiliate_email: {
            type: Sequelize.STRING
        },
        affiliate_subdomain: {
            type: Sequelize.STRING
        }
    })
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('affiliates')

  }
};
