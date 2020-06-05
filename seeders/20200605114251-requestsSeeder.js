'use strict';
const faker = require('faker');
module.exports = {
    up: (queryInterface, Sequelize) => {
      let generateUser = function(){
        return {
            requestDate: new Date(),
            requiredDate: new Date(),
            requiredDropOffTimeStart: new Date(),
            requiredDropOffTimeEnd: new Date(),
            requiredPickupLocnId: 2,
            requiredDropOffLocnId: 2,
            addedRouteDistance: 2,
            addedRouteTime: 10,
            boostersRequired: 1,
            carSeatsRequired: 1,
            creditsOffered: 100,
            booked: false,
            bookedBy: "User",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
      }
      let payload = []
      for (let index = 0; index < 10; index++) {
        payload.push(generateUser())
      }
        return queryInterface.bulkInsert("requests", payload);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("requests", null, {});
    },
};