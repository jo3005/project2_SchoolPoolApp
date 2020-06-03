module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define("Driver", {
      // The email cannot be null, and must be a proper email before creation
        driverId:{
            type: Sequelize.INTEGER,
            allowNull:false,
            autoIncrement:true,
            unique:true,
            primaryKey:true
        },
        /* memId:{
            //FK to members
            type: Sequelize.INTEGER,
            allowNull:false,
        }, */
        defaultVehicle:{
            //FK to vehicles
            type: Sequelize.INTEGER,
            allowNull:true,
        },
        stateOfIssue:{
            //ref to ausstates
            type: Sequelize.INTEGER,
            defaultValue:1,  //defaults to WA
            allowNull:true,
        },
        expiryDate: {
            allowNull: false,
            type: Sequelize.DATETIME
        },
        yearsDriving:{
            type: Sequelize.INTEGER,
            allowNull:true,
        },
        workingWithChildren:{
            //Does the driver have an official working with children check?
            type: Sequelize.BOOLEAN,
            allowNull:true,
            defaultValue:false
        },
        defaultRoute:{
            //FK to routes
            type: Sequelize.INTEGER,
            allowNull:true,
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
    Driver.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Driver.belongsTo(Member);
        Driver.HasMany(Vehicle, {
            onDelete: "cascade"
          });
        Driver.HasMany(Route, {
            onDelete: "cascade"
          });
          
      };
    


    return Driver;
  };
