module.exports = function(sequelize, DataTypes) {
    var Request = sequelize.define("Request", {
 
        reqId:{
          type: DataTypes.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },
        requestDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        requiredDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        requiredDropOffTimeStart: {
            type: DataTypes.DATE,
            allowNull: false
        },
        requiredDropOffTimeEnd: {
            type: DataTypes.DATE,
            allowNull: false
        },
        requiredPickupLocnId: {
            //FK to locations
            type: DataTypes.INTEGER,
            allowNull:false 
        },
        requiredDropoffLocnId: {
            //FK to locations
            type: DataTypes.INTEGER,
            allowNull:false 
        },
        addedRouteDistance: {
            type: DataTypes.DECIMAL(10,2),
            allowNull:false 
        },
        addedRouteTime: {
            type: DataTypes.DECIMAL(10,2),
            allowNull:false 
        },
        boostersRequired: {
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        carSeatsRequired: {
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        creditsOffered: {
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        booked:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
        },
        
        bookedBy:{
            type:DataTypes.STRING,
            defaultValue:false,
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
    Request.associate = function(models) {
        // We're saying that a request should belong to an Member
        // A request can't be created without an Member due to the foreign key constraint
        Request.belongsTo(models.Member, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Request;
  };