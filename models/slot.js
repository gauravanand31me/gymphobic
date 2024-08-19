// models/slot.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Slot = sequelize.define('Slot', {
    slot_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    slot_start_time: {
      type: DataTypes.TIME, // Stores time without date
      allowNull: false,
      validate: {
        isTime(value) {
          if (!/^(0?[1-9]|1[012]):[0-5]\d\s?(?:AM|PM)$/i.test(value)) {
            throw new Error('Slot start time must be in the format "1:00 AM" or "5:00 PM".');
          }
        },
      },
    },
    slot_end_time: {
      type: DataTypes.TIME, // Stores time without date
      allowNull: false,
      validate: {
        isTime(value) {
          if (!/^(0?[1-9]|1[012]):[0-5]\d\s?(?:AM|PM)$/i.test(value)) {
            throw new Error('Slot end time must be in the format "1:00 AM" or "5:00 PM".');
          }
        },
      },
    },
  }, {});

  return Slot;
};
