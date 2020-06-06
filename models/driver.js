module.exports = function(sequelize, DataTypes) {
    var driver = sequelize.define("driver", {
      // The email cannot be null, and must be a proper email before creation
        driverId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            unique:true,
            primaryKey:true
        },
        licenceNumber:{
            type: DataTypes.STRING,
            allowNull:false
        },
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
            allowNull: false,
            type: DataTypes.DATEONLY
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

    driver.associate = function(models) {
        // Associating Drive with member, vehicles, routes
    
        driver.belongsTo(models.member);
        driver.hasMany(models.vehicle, {
            onDelete: "cascade"
          });
        driver.hasMany(models.route, {
            onDelete: "cascade"
          });
          
      };
    


    return driver;
  };
