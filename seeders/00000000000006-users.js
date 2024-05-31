const { hash } = require('bcrypt');

('use strict');
const { fakerRU: faker } = require('@faker-js/faker');
const { strict } = require('assert');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = [];

    for (let i = 0; i < 100; i++) {
      const fake_email = `${faker.internet.email()}`;
      const fake_role_id = faker.number.int({ min: 2, max: 4 });
      let fake_organization_id = null;
      let fake_transport_id = null;

      if (fake_role_id === 2 || fake_role_id === 4) {
        fake_organization_id = faker.number.int({ min: 1, max: 50 });
      } else if (i % 5 !== 0 && fake_role_id === 3) {
        fake_organization_id = faker.number.int({ min: 1, max: 50 });
        fake_transport_id = faker.number.int({ min: 1, max: 50 });
      }

      users.push({
        username: `${faker.person.fullName()}`,
        role_id: fake_role_id,
        organization_id: fake_organization_id,
        email: fake_email,
        password: await hash(`${fake_email.split('@')[0]}`, 10),
        transport_id: fake_transport_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('users', users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
