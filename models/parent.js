module.exports = function(sequelize, DataTypes) {
    var parent = sequelize.define("parent", {
      // The email cannot be null, and must be a proper email before creation
        parentId:{
          type: DataTypes.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },
        memId:{
          type: DataTypes.INTEGER,
          allowNull:false
        },
        relationship: {
            type: DataTypes.STRING,
            default: 'Parent',
            allowNull:true 
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
    
    parent.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      parent.hasMany(models.passenger, {
        onDelete: "cascade"
      });
      parent.belongsTo(models.member,{foreignKey:{name:"memId"}});
    };
    

    return parent;
  };
  