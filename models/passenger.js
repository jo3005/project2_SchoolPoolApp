module.exports = function(sequelize, DataTypes) {
    var Passenger = sequelize.define("passenger", {
      // The email cannot be null, and must be a proper email before creation
        passId:{
          type: DataTypes.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },
        passFirstname: {
            type: DataTypes.STRING,
            allowNull:false 
        },
        passLastname: {
            type: DataTypes.STRING,
            allowNull:false 
        },
        isChild: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: true 
        },
        passGender: {
            type: DataTypes.STRING,
            allowNull:false 
        },
        haveFoodAllergies: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: false 
        },
        havePetAllergies: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: false 
        },
        whatAllergy: {
            type: DataTypes.STRING,
            allowNull:true
        },
        bigEquipmentCarried: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull:true 
        },
        meetingPointConsidered: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull:true 
        },
        passMobile:{
            type: DataTypes.STRING,
            allowNull:true
        },
        passDob: {
            type:DataTypes.DATEONLY,
            allowNull: true
        },
        passRequiredChildSeatType: {
            // 0 = none, 1=booster, 2 =childseat (4-7yrs)
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue: 0
        },
        requiresEscortToClass: {
            type: DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue: false
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
    Passenger.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Passenger.belongsTo(models.Parent,{
            onDelete: "cascade"    
        });
        Passenger.hasMany(models.Reqpassenger);
      };
    return Passenger;
  };