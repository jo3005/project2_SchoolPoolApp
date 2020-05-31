
module.exports = function(sequelize, DataTypes) {
    var Driver = sequelize.define("Driver", {
      // The email cannot be null, and must be a proper email before creation
        // driverId:{ // may not be required if driver belongs to member
        //     type: DataTypes.INTEGER,
        //     allowNull:false,
        //     autoIncrement:true,
        //     unique:true,
        //     primaryKey:true
        // },
        /* memId:{
            //FK to members
            type: DataTypes.INTEGER,
            allowNull:false,
        }, */
        defaultVehicle:{
            //FK to vehicles
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        stateOfIssue:{
            //ref to ausstates
            type: DataTypes.INTEGER,
            defaultValue:1,  //defaults to WA
            allowNull:true,
        },
        expiryDate: {
            allowNull: true, // set to true for testing
            type: DataTypes.DATE
        },
        yearsDriving:{
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        workingWithChildren:{
            //Does the driver have an official working with children check?
            type: DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue:false
        },
        defaultRoute:{
            //FK to routes
            type: DataTypes.INTEGER,
            allowNull:true,
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
    Driver.associate = function(models) {
    //     // Associating Author with Posts
    //     // When an Author is deleted, also delete any associated Posts
            Driver.belongsTo(models.Member, {
                foreignKey: {
                allowNull: false
                }
            });
            Driver.hasMany(models.Vehicle, {
                foreignKey: {
                allowNull: false,
                onDelete: "cascade"
                }
            });
            Driver.hasMany(models.Route, {
                foreignKey: {
                allowNull: false,
                onDelete: "cascade"
                }
            });

    };
  

    return Driver;
  };
