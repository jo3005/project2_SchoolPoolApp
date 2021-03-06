module.exports = function(sequelize, DataTypes) {
    var reqpassenger = sequelize.define("reqpassenger", {
      // The email cannot be null, and must be a proper email before creation
        reqPassId:{
          type: DataTypes.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },
        passengerId: {
            //may not be required
            type:DataTypes.INTEGER,
            allowNull:false
        },
        reqId:{
          //may not be required
          type:DataTypes.INTEGER,
          allowNull:false
        }

    });
    reqpassenger.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        reqpassenger.belongsTo(models.request,{
          onDelete: "cascade", 
          foreignKey:{name:"reqId"}   
        });
        reqpassenger.belongsTo(models.passenger,{
          onDelete: "cascade", 
          foreignKey:{name:"passengerId"}   
        });
        
      };
    return reqpassenger;
  };