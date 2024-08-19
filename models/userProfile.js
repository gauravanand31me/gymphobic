'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define('UserProfile', {
    user_profile_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    followers_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    upload_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    following_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {});

  // Define associations here
  UserProfile.associate = function(models) {
    UserProfile.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return UserProfile;
};
