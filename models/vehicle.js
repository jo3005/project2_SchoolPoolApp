module.exports = function(sequelize, DataTypes) {
    var Vehicle = sequelize.define("vehicle", {
      // The email cannot be null, and must be a proper email before creation
        vehicleId:{
          type: DataTypes.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },     
        registration: {
            type: DataTypes.STRING,
            allowNull:false 
        },
        make: {
            type: DataTypes.STRING,
            allowNull:true 
        },
        model: {
            type: DataTypes.STRING,
            allowNull:true 
        },
        color: {
            type: DataTypes.STRING,
            allowNull:true 
        },
        spareSpots: {
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:1 
        },
        spareChildSeats: {
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0 
        },
        spareBoosters: {
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0 
        },
        petsEverTravel: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false 
        },
        createdAt: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }

    });
    Vehicle.associate = function(models) {
        // Associating Drive with member, vehicles, routes
    
        Vehicle.belongsTo(models.Driver, {
            onDelete: "cascade"
          });
       
      };
    return Vehicle;
  };