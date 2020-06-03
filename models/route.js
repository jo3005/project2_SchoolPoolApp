module.exports = function(sequelize, DataTypes) {
    var Route = sequelize.define("Route", {
      // The email cannot be null, and must be a proper email before creation
        routeId:{
          type: DataTypes.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },
        routeName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startLocnId: {
            //FK to locations
            type: DataTypes.INTEGER,
            allowNull:false 
        },
        endLocnId: {
            //FK to locations
            type: DataTypes.INTEGER,
            allowNull:false 
        },
        routeDistance: {
            type: DataTypes.DECIMAL(10,2),
            allowNull:false 
        },
        routeTotalTime: {
            type: DataTypes.DECIMAL(10,2),
            allowNull:false 
        },
        routeStartTime: {
            type:DataTypes.TIME,
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
    Route.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Route.belongsTo(models.Driver);
        
      };
    return Route;
  };