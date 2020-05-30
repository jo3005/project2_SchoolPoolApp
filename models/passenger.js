module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define("Passenger", {
      // The email cannot be null, and must be a proper email before creation
        passId:{
          type: Sequelize.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },
       
        passFirstname: {
            type: Sequelize.STRING,
            allowNull:false 
        },
        passLastname: {
            type: Sequelize.STRING,
            allowNull:false 
        },
        isChild: {
            type: Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue: true 
        },
        passGender: {
            type: Sequelize.STRING,
            allowNull:false 
        },
        haveFoodAllergies: {
            type: Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue: false 
        },
        havePetAllergies: {
            type: Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue: false 
        },
        whatAllergy: {
            type: Sequelize.STRING,
            allowNull:true
        },
        bigEquipmentCarried: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull:true 
        },
        meetingPointConsidered: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull:true 
        },
        passMobile:{
            type: Sequelize.STRING,
            allowNull:true
        },
        passDob: {
            type:Sequelize.DATETIME,
            allowNull: true
        },
        passRequiredChildSeatType: {
            // 0 = none, 1=booster, 2 =childseat (4-7yrs)
            type: Sequelize.INTEGER,
            allowNull:true,
            defaultValue: 0
        },
        requiresEscortToClass: {
            type: Sequelize.BOOLEAN,
            allowNull:true,
            defaultValue: false
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
    Passenger.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Passenger.belongsTo(Parent,{
            onDelete: "cascade"    
        });
        Passenger.hasMany(Reqpassenger);
      };
    return Passenger;
  };