module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define("School", {
      // The email cannot be null, and must be a proper email before creation
        schoolId:{
          type: Sequelize.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },
        schoolName: {
            type: Sequelize.STRING,
            allowNull:false 
        },
        campusName: {
            type: Sequelize.STRING,
            allowNull:false 
        },
        schoolAddr:{
            type: Sequelize.STRING,
            allowNull:false
        },
        schoolPhone:{
            type:Sequelize.STRING,
            allowNull:true
        },
        openTime: {
            type: Sequelize.TIME,
            allowNull: true
        },
        startTime: {
            type: Sequelize.TIME,
            allowNull: true
        },
        finishTime: {
            type: Sequelize.TIME,
            allowNull: true
        },
        closeTime: {
            type: Sequelize.TIME,
            allowNull: true
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
    
    return School;
  };