module.exports = function(sequelize, DataTypes) {
    var Reqpassenger = sequelize.define("Reqpassenger", {
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
        }

    });
    Reqpassenger.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Reqpassenger.belongsTo(models.Request);
        Reqpassenger.belongsTo(models.Passenger);
        
      };
    return Reqpassenger;
  };