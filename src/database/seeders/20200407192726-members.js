'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Members', [
      {
        id: 1,
        jeId: 1,
        email: 'viniciusvedovotto@ejcomp.com',
        password: '54812652654',
        name: 'Vinicius Vedovotto',
        board: 'skdjsk',
        position: 'Projetos',
        sr: '171257499',
        image: 'img1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        jeId: 1,
        email: 'leoyogurte@ejcomp.com',
        password: '5651545565',
        name: 'Leonardo Yogurte',
        board: 'skdjsk',
        position: 'Projetos',
        sr: '171257333',
        image: 'img2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        jeId: 2,
        email: 'maluanestafocher@ejcomp.com',
        password: '515125456',
        name: 'Maluane Stafocher',
        board: 'esse ai msm',
        position: 'RH',
        sr: '171254515',
        image: 'img3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Members', null, {});
  }
};
