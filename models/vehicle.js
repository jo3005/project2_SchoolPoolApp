module.exports = function(sequelize, DataTypes) {
    var Vehicle = sequelize.define("Vehicle", {
      // The email cannot be null, and must be a proper email before creation
        // vehicleId:{
        //   type: Sequelize.INTEGER,
        //   allowNull:false,
        //   autoIncrement:true,
        //   unique:true,
        //   primaryKey:true
        // },     
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
        // We're saying that a Vehicle should belong to an Driver
        // A Vehicle can't be created without an Driver due to the foreign key constraint
        Vehicle.belongsTo(models.Driver, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Vehicle;
  };