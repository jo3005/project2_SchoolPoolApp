module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define("Vehicle", {
      // The email cannot be null, and must be a proper email before creation
        vehicleId:{
          type: Sequelize.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },     
        registration: {
            type: Sequelize.STRING,
            allowNull:false 
        },
        make: {
            type: Sequelize.STRING,
            allowNull:true 
        },
        model: {
            type: Sequelize.STRING,
            allowNull:true 
        },
        color: {
            type: Sequelize.STRING,
            allowNull:true 
        },
        spareSpots: {
            type: Sequelize.INTEGER,
            allowNull:false,
            defaultValue:1 
        },
        spareChildSeats: {
            type: Sequelize.INTEGER,
            allowNull:false,
            defaultValue:0 
        },
        spareBoosters: {
            type: Sequelize.INTEGER,
            allowNull:false,
            defaultValue:0 
        },
        petsEverTravel: {
            type: Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue:false 
        },
        createdAt: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }

    });
    
    return Vehicle;
  };