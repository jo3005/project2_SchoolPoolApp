module.exports = function(sequelize, DataTypes) {
    var school = sequelize.define("school", {
      // The email cannot be null, and must be a proper email before creation
        schoolId:{
          type: DataTypes.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },
        schoolName: {
            type: DataTypes.STRING,
            allowNull:false 
        },
        campusName: {
            type: DataTypes.STRING,
            allowNull:false 
        },
        schoolAddr:{
            type: DataTypes.STRING,
            allowNull:false
        },
        schoolPhone:{
            type:DataTypes.STRING,
            allowNull:true
        },
        openTime: {
            type: DataTypes.TIME,
            allowNull: true
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: true
        },
        finishTime: {
            type: DataTypes.TIME,
            allowNull: true
        },
        closeTime: {
            type: DataTypes.TIME,
            allowNull: true
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
    
    return school;
  };