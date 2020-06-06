module.exports = function(sequelize, DataTypes) {
    var location = sequelize.define("location", {
      // The email cannot be null, and must be a proper email before creation
        locId:{
          type: DataTypes.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },
        locationName: {
            type: DataTypes.STRING,
            allowNull:false 
        },
        streetNumber:{
            type: DataTypes.STRING,
            allowNull:true
        },
        streetName:{
            type: DataTypes.STRING,
            allowNull:true
        },
        suburb:{
            type: DataTypes.STRING,
            allowNull:true
        },
        postcode:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        state:{
            type: DataTypes.STRING,
            allowNull:true
        },
        country:{
            type: DataTypes.STRING,
            allowNull:true
        },
        locGps:{
            type: DataTypes.STRING,
            allowNull:true
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
    
    location.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        location.belongsTo(models.member);
      };

    return location;
  };



  // TODO: check that at least locAddress or locGps is not null.

