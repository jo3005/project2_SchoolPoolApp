module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define("Route", {
      // The email cannot be null, and must be a proper email before creation
        routeId:{
          type: Sequelize.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },
        routeName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        startLocnId: {
            //FK to locations
            type: Sequelize.INTEGER,
            allowNull:false 
        },
        endLocnId: {
            //FK to locations
            type: Sequelize.INTEGER,
            allowNull:false 
        },
        routeDistance: {
            type: Sequelize.DECIMAL(10,2),
            allowNull:false 
        },
        routeTotalTime: {
            type: Sequelize.DECIMAL(10,2),
            allowNull:false 
        },
        routeStartTime: {
            type:Sequelize.TIME,
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
    Route.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Route.belongsTo(Driver);
        
      };
    return Route;
  };