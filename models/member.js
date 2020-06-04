// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model

module.exports = function(sequelize, DataTypes) {
  const Member = sequelize.define("Member", {
    // The email cannot be null, and must be a proper email before creation
    memId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        unique:true,
        primaryKey:true
    },
    memUsername: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    memFirstname:{
        type: DataTypes.STRING,
        allowNull:false,
    }, 

    memLastname: {
        type: DataTypes.STRING,
        allowNull:false,
    }, 
    memEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    credits: {
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    memMobile:{
        type:DataTypes.STRING(16),
        defaultValue:'0061 000 000 000'
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
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Member.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Member.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  Member.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Member.hasOne(models.Driver, {
      onDelete: "cascade"
    });
    Member.hasOne(models.Parent, {
      onDelete: "cascade"
    });
    Member.hasMany(models.Request,{
      onDelete: "cascade"
  });
    
  };


  return Member;
};
