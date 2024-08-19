// models/gymSlot.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const GymSlot = sequelize.define('GymSlot', {
    gym_slot_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },
    gym_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Gyms',
        key: 'gym_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    slot_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Slots',
        key: 'slot_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Default to true
    },
  }, {});

  // Associations can be defined here
  GymSlot.associate = function(models) {
    GymSlot.belongsTo(models.Gym, { foreignKey: 'gym_id', as: 'gym' });
    GymSlot.belongsTo(models.Slot, { foreignKey: 'slot_id', as: 'slot' });
  };

  return GymSlot;
};
