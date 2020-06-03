module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define("Location", {
      // The email cannot be null, and must be a proper email before creation
        locId:{
          type: Sequelize.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },
        locationName: {
            type: Sequelize.STRING,
            allowNull:false 
        },
        streetNumber:{
            type: Sequelize.STRING,
            allowNull:true
        },
        streetName:{
            type: Sequelize.STRING,
            allowNull:true
        },
        suburb:{
            type: Sequelize.STRING,
            allowNull:true
        },
        postcode:{
            type: Sequelize.INTEGER,
            allowNull:true
        },
        locGps:{
            type: Sequelize.STRING,
            allowNull:true
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
    
    Location.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Location.belongsTo(models.Member);
      };

    return Location;
  };



  // TODO: check that at least locAddress or locGps is not null.

