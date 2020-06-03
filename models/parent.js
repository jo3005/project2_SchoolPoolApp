module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define("Parent", {
      // The email cannot be null, and must be a proper email before creation
        parentId:{
          type: Sequelize.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },/* 
        memId:{
          type: Sequelize.INTEGER,
          allowNull:false,
        }, */
        relationship: {
            type: Sequelize.STRING,
            default: 'Parent',
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
    
    Parent.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Parent.hasMany(models.Passenger, {
        onDelete: "cascade"
      });
      Parent.belongsTo()
    };
    

    return Parent;
  };
  