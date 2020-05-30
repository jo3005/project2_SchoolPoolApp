module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define("Route", {
      // The email cannot be null, and must be a proper email before creation
        reqId:{
          type: Sequelize.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },
        requestDate: {
            type: Sequelize.DATETIME,
            allowNull: false
        },
        requiredDate: {
            type: Sequelize.DATETIME,
            allowNull: false
        },
        requiredDropOffTimeStart: {
            type: Sequelize.DATETIME,
            allowNull: false
        },
        requiredDropOffTimeEnd: {
            type: Sequelize.DATETIME,
            allowNull: false
        },
        requiredPickupLocnId: {
            //FK to locations
            type: Sequelize.INTEGER,
            allowNull:false 
        },
        requiredDropoffLocnId: {
            //FK to locations
            type: Sequelize.INTEGER,
            allowNull:false 
        },
        addedRouteDistance: {
            type: Sequelize.DECIMAL(10,2),
            allowNull:false 
        },
        addedRouteTime: {
            type: Sequelize.DECIMAL(10,2),
            allowNull:false 
        },
        boostersRequired: {
            type:Sequelize.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        carSeatsRequired: {
            type:Sequelize.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        creditsOffered: {
            type:Sequelize.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        booked:{
            type:Sequelize.BOOLEAN,
            defaultValue:false,
        },
        
        bookedBy:{
            type:Sequelize.STRING,
            defaultValue:false,
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
    Request.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Request.belongsTo(Member);
        Request.hasMany(Reqpassenger);
        
      };
    return Route;
  };