'use strict';

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    booking_id: {
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
    gym_slot_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'GymSlots',
        key: 'gym_slot_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    booking_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    booking_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['pending', 'completed', 'failed']],
      },
    },
  }, {});

  // Define associations here
  Booking.associate = function(models) {
    Booking.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Booking.belongsTo(models.Gym, { foreignKey: 'gym_id', as: 'gym' });
    Booking.belongsTo(models.GymSlot, { foreignKey: 'gym_slot_id', as: 'slot' });
  };

  return Booking;
};
