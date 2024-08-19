'use strict';

module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define('Followers', {
    follow_id: {
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
    follower_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    followed_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    is_blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'follower_id']
      }
    ]
  });

  // Define associations here
  Followers.associate = function(models) {
    Followers.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Followers.belongsTo(models.User, { foreignKey: 'follower_id', as: 'follower' });
  };

  return Followers;
};
